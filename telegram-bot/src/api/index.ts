import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { Config } from '../bot/config/config.interface';
import { generateOfferMessage } from '../utils';
import { basicAuth } from './middlewares';

interface Params {
    prisma: PrismaClient;
    botMethods: {
        notify: (chatId: number, message: string) => Promise<void>;
    };
}

export const initApi = (config: Config, { prisma, botMethods }: Params) => {
    const app = express();
    const port = config.get('PORT') || 5000;

    app.use(express.json());

    app.get('/api/health', basicAuth, (_req: Request, res: Response) => {
        res.send({ status: 'ok' });
    });

    app.post('/api/notify', basicAuth, async (req: Request, res: Response) => {
        const { chatId, message } = req.body;

        await botMethods.notify(chatId, message);

        res.sendStatus(204);
    });

    app.post('/api/offers', basicAuth, async (req: Request, res: Response) => {
        const { title, text, image, startAt, endAt, url, cityId, topicId, tags } = req.body;

        const result = await prisma.offer.create({
            data: {
                title,
                text,
                image,
                startAt: new Date(startAt),
                endAt: new Date(endAt),
                url,
                cityId,
                topicId,
                tags: {
                    connect: tags.map((tag: number) => ({ id: tag })),
                },
            },
            include: {
                topic: true,
                city: true,
                tags: true,
            },
        });

        const users = await prisma.user.findMany();

        users.forEach((user) => {
            if (user.hasNotification) {
                botMethods.notify(user.telegramId, generateOfferMessage(result));
            }
        });

        res.status(201).send(result);
    });

    app.listen(port, async () => {
        console.log(`Example app listening on port ${port}`);
    });
};
