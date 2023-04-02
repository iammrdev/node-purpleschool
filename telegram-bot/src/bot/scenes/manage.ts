import { Markup, Scenes } from 'telegraf';
import { generateOfferMessage, getUserId } from '../../utils';
import { MyContext } from '../types';

const sceneMenu = Markup.keyboard([
    [Markup.button.text('Доступные акции'), Markup.button.text('Активные подписки')],
    [Markup.button.text('Подписаться на акции'), Markup.button.text('Отписаться')],
    [Markup.button.text('Изменить статус уведомлений'), Markup.button.text('🌏 Изменить город')],
    [Markup.button.text('✅ Назад')],
]).resize();

const getTopicActionButtons = (
    topics: { id: number; name: string }[],
    action: 'subscribe' | 'unsubscribe',
) =>
    Markup.inlineKeyboard(
        topics.map((topic) => [Markup.button.callback(topic.name, `${topic.id}-${action}`)]),
    );

export const manageScene = new Scenes.BaseScene<MyContext>('manage');

manageScene.enter((ctx) => {
    if (ctx.session?.state?.city) {
        return ctx.reply('Вы в разделе акций', sceneMenu);
    }
    return ctx.scene.enter('city');
});

manageScene.hears('Доступные акции', async (ctx) => {
    const userId = getUserId(ctx);

    const user = await ctx.props.repository.getUser(userId);

    if (!user?.subscribes?.length) {
        return ctx.reply(
            'У вас не активных подписок. Для того чтобы видеть акции подпишитесь на необходимые тематики',
        );
    }

    const offers = await ctx.props.repository.getOffersBySubscribes(user.subscribes);

    if (!offers.length) {
        return ctx.reply('По выбранным тематикам нет активных акций');
    }

    const result = offers.map((offer) => ctx.replyWithHTML(generateOfferMessage(offer)));

    return Promise.all(result);
});

manageScene.hears('Активные подписки', async (ctx) => {
    const userId = getUserId(ctx);

    const user = await ctx.props.repository.getUser(userId);

    const topics = await ctx.props.repository.getActiveTopics(user.subscribes);

    if (!topics?.length) {
        return ctx.reply('У вас нет активных подписок');
    }

    const result = topics.map((topic) => topic.name).join('\n');

    return ctx.reply(result);
});

manageScene.hears('Подписаться на акции', async (ctx) => {
    const userId = getUserId(ctx);

    const user = await ctx.props.repository.getUser(userId);
    const topics = await ctx.props.repository.getUnactiveTopics(user?.subscribes);

    if (!topics?.length) {
        return ctx.reply('Нет доступных тематик для подписки. Вы подписаны на все тематики');
    }

    manageScene.action(
        topics.map((item) => item.id).map((topic) => `${topic}-subscribe`),
        async (ctx) => {
            await ctx.answerCbQuery();

            ctx.deleteMessage();

            const userId = getUserId(ctx);
            const [id] = ctx.match.input.split('-');
            const topicId = Number(id);

            await ctx.props.repository.subscribeTopicByUser(userId, topicId);

            const user = await ctx.props.repository.getUser(userId);

            const topics = await ctx.props.repository.getUnactiveTopics(user?.subscribes);

            if (topics.length === 0) {
                return ctx.reply(
                    'Нет доступных тематик для подписки. Вы подписаны на все тематики',
                );
            }

            return ctx.reply(
                'Выберите тематики для подписки',
                getTopicActionButtons(topics, 'subscribe'),
            );
        },
    );

    return ctx.reply('Выберите тематики для подписки', getTopicActionButtons(topics, 'subscribe'));
});

manageScene.hears('Отписаться', async (ctx) => {
    const userId = getUserId(ctx);

    const user = await ctx.props.repository.getUser(userId);

    if (user.subscribes.length === 0) {
        return ctx.reply('У вас нет активных подписок');
    }

    manageScene.action(
        user.subscribes.map((topic) => `${topic}-unsubscribe`),
        async (ctx) => {
            await ctx.answerCbQuery();

            ctx.deleteMessage();

            const [id] = ctx.match.input.split('-');
            const topicId = Number(id);

            const userId = getUserId(ctx);

            await ctx.props.repository.unsubscribeTopicByUser(userId, topicId);

            const user = await ctx.props.repository.getUser(userId);
            const topics = await ctx.props.repository.getActiveTopics(user.subscribes);

            if (topics.length === 0) {
                return ctx.reply('У вас нет активных подписок');
            }

            return ctx.reply(
                'Выберите тематики от которых хотите отписаться',
                getTopicActionButtons(topics, 'unsubscribe'),
            );
        },
    );

    return ctx.reply(
        'Выберите тематики от которых хотите отписаться',
        getTopicActionButtons(user?.topics || [], 'unsubscribe'),
    );
});

manageScene.hears('✅ Назад', (ctx) => {
    return ctx.scene.enter('main');
});

manageScene.hears('🌏 Изменить город', (ctx) => {
    return ctx.scene.enter('city');
});

manageScene.hears('Изменить статус уведомлений', async (ctx) => {
    const userId = getUserId(ctx);
    const result = await ctx.props.repository.toggleNotifications(userId);

    const text = result.hasNotification
        ? 'Уведомления включены. Вы будете получать уведомления о новых акциях'
        : 'Уведомления отключены. Вы больше не будете получать уведомления о новых акциях';

    return ctx.reply(text);
});

manageScene.on('text', async (ctx, next) => {
    const message = ctx.message.text;

    if (['/start', '/help', '/settings'].includes(message)) {
        return next();
    }

    const answer = await ctx.reply(
        'Неизвестная команда. К сожалению, я не смог понять ваше сообщение',
    );

    setTimeout(() => {
        ctx.deleteMessage(ctx.message.message_id);
        ctx.deleteMessage(answer.message_id);
    }, 5000);
});
