import { format } from 'date-fns';
import { City, Offer, Tag, Topic } from '@prisma/client';
import { MyContext } from './bot/types';

export const getUserId = (ctx: MyContext) => {
    return (ctx.props.telegramId || ctx?.callbackQuery?.from.id)!;
};

export const generateOfferMessage = (
    offer: Offer & {
        topic: Topic;
        city: City;
        tags: Tag[];
    },
) =>
    `<b>${offer.title}</b>\n\n${offer.text}\n\n${offer.url}\n\nТопик: ${offer.topic.name}\nГород: ${
        offer.city.name
    }\n\nДата начала акции: ${format(
        new Date(offer.startAt),
        'dd.MM.yyyy',
    )}\nСрок окончания акции: ${format(new Date(offer.endAt), 'dd.MM.yyyy')}\n\n${offer.tags
        .map((tag) => `#${tag.name}`)
        .join(' ')}`;
