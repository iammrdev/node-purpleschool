import { Markup, Scenes } from 'telegraf';
import { MyContext } from '../types';

const getSceneMenu = (cities: string[]) =>
    Markup.keyboard([cities.map((city) => Markup.button.text(city))]).resize();

export const cityScene = new Scenes.BaseScene<MyContext>('city');

cityScene.enter(async (ctx) => {
    const cities = await ctx.props.repository.getCities();
    const cityNames = cities.map((city) => city.name);

    cityScene.hears(cityNames, (ctx) => {
        ctx.session.state.city = ctx.message.text;

        return ctx.scene.enter('manage');
    });

    return ctx.reply('Выберите город', getSceneMenu(cityNames));
});
