import { PrismaClient } from '@prisma/client';
import { BotRepository } from '../repository';
import { MyContext } from '../types';

export const initProps =
    (props: { clientDB: PrismaClient }) => (ctx: MyContext, next: () => void) => {
        const telegramId = (ctx.message?.chat.id || ctx.message?.from?.id)!;

        ctx.props = { repository: new BotRepository(props.clientDB), telegramId };

        return next();
    };
