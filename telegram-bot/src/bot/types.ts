import { Context, Scenes } from 'telegraf';
import { BotRepository } from './repository';

export interface MySessionScene extends Scenes.SceneSessionData {}

export interface MySession extends Scenes.SceneSession<MySessionScene> {
    state: {
        user?: Record<string, any>;
        city?: string;
        topics?: string[];
    };
}

export interface MyContext extends Context {
    props: {
        telegramId: number;
        repository: BotRepository;
    };
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MySessionScene>;
}
