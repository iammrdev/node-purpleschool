import 'dotenv/config';
import { Markup, Telegraf } from 'telegraf';

const token = process.env.TOKEN;

if (!token) {
    throw new Error('На задан токен');
}

const bot = new Telegraf(token);

bot.action('some data', (ctx) => {
    console.log(ctx.callbackQuery.data);
    ctx.replyWithMarkdownV2('*Done*');
});

bot.command('test', (ctx) => {
    ctx.reply('Команда принята!', Markup.keyboard(['/image', '/markup']).oneTime().resize());
});

bot.command('image', (ctx) => {
    ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' });
});

bot.command('markup', (ctx) => {
    ctx.reply('mark', {
        reply_markup: {
            inline_keyboard: [[{ text: 'Click me', callback_data: 'some data' }]],
        },
    });
});

bot.on('text', (ctx) => {
    ctx.reply('Привет!');
});

bot.launch();
