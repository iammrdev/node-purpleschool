import { Markup, Scenes } from 'telegraf';
import { MyContext } from '../types';

export const mainMenu = Markup.keyboard([['🌏 Акции', '🍀 Информация']]).resize();

export const mainScene = new Scenes.BaseScene<MyContext>('main');

mainScene.hears('🌏 Акции', (ctx) => ctx.scene.enter('manage'));
mainScene.hears('🍀 Информация', (ctx) =>
    ctx.reply('Я бот, который поможет тебе следить за самыми последними акциями'),
);

mainScene.on('text', async (ctx, next) => {
    const message = ctx.message.text;

    if (['/start', '/help', '/settings'].includes(message)) {
        return next();
    }

    const answer = await ctx.reply(
        'Неизвестная команда. К сожалению, я не смог понять ваше сообщение',
    );

    setTimeout(() => {
        ctx.deleteMessage(ctx.message.message_id);
        ctx.deleteMessage(answer.message_id);
    }, 5000);
});

mainScene.enter((ctx) => {
    return ctx.reply(`✅ Ты находишься в главном меню`, mainMenu);
});
