import { Scenes, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { initSessionState } from './middlewares/initSessionState';
import { mainScene } from './scenes/main';
import { subscribeScene } from './scenes/subscribe';
import { MyContext } from './types';

const token = process.env.TOKEN;

if (!token) {
    throw new Error('На задан токен');
}

export const setupBot = () => {
    const bot = new Telegraf<MyContext>(token);

    const stage = new Scenes.Stage([mainScene, subscribeScene]);

    bot.use(new LocalSession({ database: 'session.json' }).middleware());
    bot.use(stage.middleware());
    bot.use(initSessionState);

    bot.command('/start', (ctx) => {
        ctx.reply(
            `Привет, ${ctx.message?.from?.first_name}! Я бот, который поможет тебе следить за самыми последними акциями`,
        );

        return ctx.scene.enter('main');
    });

    return bot;
};
