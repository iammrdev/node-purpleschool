import { Markup, Scenes } from 'telegraf';
import { MyContext } from '../types';
import { back } from './back';

const sceneMenu = Markup.keyboard([
    [Markup.button.text('Москва'), Markup.button.text('Санкт-Петербург')],
    [Markup.button.text('✅ В меню')],
]).resize();

const topicMenu = Markup.keyboard([
    [Markup.button.text('JavaScript'), Markup.button.text('React')],
    [Markup.button.text('Vue'), Markup.button.text('Angular')],
    [Markup.button.text('SystemDesign'), Markup.button.text('Algorithms')],
    [Markup.button.text('🌏 Выбрать город'), Markup.button.text('✅ В меню')],
]);

export const subscribeScene = new Scenes.BaseScene<MyContext>('subscribe');

subscribeScene.enter((ctx) => {
    if (ctx.session?.state?.city) {
        return ctx.reply('Выберите тематики для подписки', topicMenu);
    }
    return ctx.reply('Выберите город', sceneMenu);
});

subscribeScene.hears('✅ В меню', (ctx) => {
    ctx.scene.leave();
    return back(ctx);
});

subscribeScene.hears('🌏 Выбрать город', (ctx) => {
    return ctx.reply('Выберите город', sceneMenu);
});

subscribeScene.hears(['Москва', 'Санкт-Петербург'], (ctx) => {
    ctx.session.state.city = ctx.message.text;

    ctx.reply('Выберите тематики для подписки', topicMenu);
});

subscribeScene.hears(['JavaScript', 'React', 'Vue', 'Angular', 'SystemDesign', 'Algorithms'], (ctx) => {
    if (!ctx.session.state.topics) {
        ctx.session.state.topics = [];
    }

    if (!ctx.session.state.topics.includes(ctx.message.text)) {
        ctx.session.state.topics.push(ctx.message.text);
        return ctx.reply(`Вы подписались на: ${ctx.message.text}`);
    }
    ctx.reply(`Вы уже подписаны на: ${ctx.message.text}`);
});

subscribeScene.on('text', async (ctx) => {
    if (ctx.session?.state?.city) {
        return ctx.reply('Неизвестная команда', topicMenu);
    }
    return ctx.reply('Неизвестная команда', sceneMenu);
});
