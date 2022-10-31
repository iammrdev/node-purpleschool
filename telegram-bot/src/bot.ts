import { Scenes, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { back } from './controllers/back';
import { start } from './controllers/start';
import { subscribeScene } from './controllers/subscribe';
import { MyContext } from './types';

const token = process.env.TOKEN;

if (!token) {
    throw new Error('На задан токен');
}

export const setupBot = () => {
    const bot = new Telegraf<MyContext>(token);

    const stage = new Scenes.Stage([subscribeScene]);

    bot.use(new LocalSession({ database: 'session.json' }).middleware());
    bot.use(stage.middleware());
    bot.use((ctx, next) => {
        console.log({ myProp: ctx.session.myProp });
        console.log({ myProps: ctx.scene?.session.myProps });

        if (!ctx.session.state) {
            ctx.session.state = {};
        }

        if (!ctx.session.state.userId) {
            ctx.session.state.userId = ctx.message?.from.id;
        }

        return next();
    });

    bot.start(start);

    bot.hears('✅ В меню', back);
    bot.hears('🌏 Подписаться на акции', (ctx) => ctx.scene.enter('subscribe'));
    bot.hears('🍀 Информация', (ctx) => ctx.reply('Я бот, который поможет тебе следить за самыми последними акциями'));

    return bot;
};
