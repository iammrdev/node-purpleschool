import { MyContext } from '../types';

export const initSessionState = (ctx: MyContext, next: () => void) => {
    if (!ctx.session.state) {
        ctx.session.state = {};
    }

    if (!ctx.session.state.user) {
        ctx.session.state.user = {};
    }

    if (!ctx.session.state.user.id) {
        ctx.session.state.user.id = ctx.message?.chat.id;
    }

    return next();
};
