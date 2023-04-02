import auth from 'express-basic-auth';

export const basicAuth = auth({
    users: (() => {
        if (process.env.USER && process.env.PASSWORD) {
            return { [process.env.USER]: process.env.PASSWORD };
        }

        return {};
    })(),
});
