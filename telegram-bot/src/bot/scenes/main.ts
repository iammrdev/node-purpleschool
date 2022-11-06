import { Markup, Scenes } from 'telegraf';
import { MyContext } from '../types';

export const mainMenu = Markup.keyboard([['🌏 Подписаться на акции', '🍀 Информация']]).resize();

export const mainScene = new Scenes.BaseScene<MyContext>('main');

mainScene.hears('🌏 Подписаться на акции', (ctx) => ctx.scene.enter('subscribe'));
mainScene.hears('🍀 Информация', (ctx) =>
    ctx.reply('Я бот, который поможет тебе следить за самыми последними акциями'),
);

mainScene.enter((ctx) => {
    return ctx.reply(`✅ Ты находишься в меню`, mainMenu);
});
