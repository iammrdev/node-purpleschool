import { Markup, Scenes, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { PrismaClient } from '@prisma/client';
import { initProps } from './middlewares/initProps';
import { initSessionState } from './middlewares/initSessionState';
import { mainScene } from './scenes/main';
import { manageScene } from './scenes/manage';
import { MyContext } from './types';
import { cityScene } from './scenes/city';

const token = process.env.TOKEN;

if (!token) {
    throw new Error('На задан токен');
}

export const setupBot = ({ prisma }: { prisma: PrismaClient }) => {
    const bot = new Telegraf<MyContext>(token);

    bot.use(new LocalSession({ database: 'session.json' }).middleware());
    bot.use(initProps({ clientDB: prisma }));
    bot.use(initSessionState);

    const stage = new Scenes.Stage([mainScene, manageScene, cityScene]);

    bot.use(stage.middleware());

    bot.command('/start', (ctx) => {
        ctx.reply(
            `Привет, ${ctx.message?.from?.first_name}! Я бот, который поможет тебе следить за самыми последними акциями`,
        );

        return ctx.scene.enter('main');
    });

    bot.help((ctx) => ctx.reply('Помощь'));
    bot.settings((ctx) => ctx.reply('Настройки'));

    return {
        bot,
        botMethods: {
            notify: async (chatId: number, message: string) => {
                await bot.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
            },
        },
    };
};
