import { Markup } from 'telegraf';
import { MyContext } from '../types';

export const mainMenu = Markup.keyboard([['🌏 Подписаться на акции']]).resize();

export const start = (ctx: MyContext) => {
    ctx.session.myProp = ctx.message?.from?.id;

    return ctx.reply(
        `
        ❤️ Привет, ${ctx.message?.from?.first_name}! 

        Я бот, который поможет тебе следить за самыми последними акциями
    `,
        {
            disable_web_page_preview: true,
            parse_mode: 'HTML',
            ...mainMenu,
        },
    );
};
