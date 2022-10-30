import { MyContext } from '../types';
import { mainMenu } from './start';

export const back = (ctx: MyContext) =>
    ctx.reply(`✅ Ты находишься в меню`, {
        disable_web_page_preview: true,
        parse_mode: 'HTML',
        ...mainMenu,
    });
