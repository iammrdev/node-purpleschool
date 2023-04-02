import { getUserId } from '../../utils';
import { MyContext } from '../types';

export const initSessionState = async (ctx: MyContext, next: () => void) => {
    const telegramId = getUserId(ctx)!;

    const user = await ctx.props.repository.getUser(telegramId);

    if (!user) {
        await ctx.props.repository.createUser(
            telegramId,
            [ctx.message?.from.first_name, ctx.message?.from.last_name].filter(Boolean).join(' '),
        );
    }

    ctx.session.state = {
        user: {
            id: telegramId,
        },
    };

    return next();
};
