import { MyContext } from '../types';
import { mainMenu } from './start';

export const back = (ctx: MyContext) => ctx.reply(`✅ Ты находишься в меню`, mainMenu);
