import { PrismaClient } from '@prisma/client';

export class BotRepository {
    client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    createUser = async (telegramId: number, name: string) => {
        return this.client.user.create({
            data: {
                telegramId,
                name,
            },
        });
    };

    getUser = async (telegramId: number) => {
        const user = await this.client.user.findUnique({
            where: { telegramId },
            include: { topics: true },
        });

        return {
            ...user,
            subscribes: (user?.topics || []).map((item) => item.id),
        };
    };

    subscribeTopicByUser = async (telegramId: number, topicId: number) => {
        return this.client.user.update({
            where: { telegramId },
            data: {
                topics: {
                    connect: { id: topicId },
                },
            },
        });
    };

    unsubscribeTopicByUser = async (telegramId: number, topicId: number) => {
        return this.client.user.update({
            where: { telegramId },
            data: {
                topics: {
                    disconnect: { id: topicId },
                },
            },
        });
    };

    getOffersBySubscribes = async (subscribes: number[]) => {
        const today = new Date();

        return this.client.offer.findMany({
            where: {
                topicId: {
                    in: subscribes,
                },
                startAt: {
                    lte: today,
                },
                endAt: {
                    gte: today,
                },
            },
            include: {
                topic: true,
                city: true,
                tags: true,
            },
        });
    };

    getActiveTopics = async (subscribes: number[]) => {
        return this.client.topic.findMany({
            where: {
                id: {
                    in: subscribes,
                },
            },
        });
    };

    getUnactiveTopics = async (subscribes: number[] = []) => {
        return this.client.topic.findMany({
            where: {
                id: {
                    notIn: subscribes,
                },
            },
        });
    };

    getCities = async () => {
        return this.client.city.findMany();
    };

    toggleNotifications = async (telegramId: number) => {
        const user = await this.getUser(telegramId);

        return this.client.user.update({
            where: { telegramId },
            data: {
                hasNotification: !user.hasNotification,
            },
        });
    };
}
