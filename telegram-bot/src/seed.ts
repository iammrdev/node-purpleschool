import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
    Number(Number(Math.random() * (max - min) + min).toFixed(numAfterDigit));

const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

const user = {
    name: 'Vitalii',
    username: 'iashchuk',
    telegramId: 338366302,
};

const topics = [
    { name: 'Электроника' },
    { name: 'Книги' },
    { name: 'Продукты питания' },
    { name: 'Одежда' },
];
const cities = [{ name: 'Москва' }, { name: 'Санкт-Петербург' }];
const tags = [{ name: 'Сыр' }, { name: 'Печенье' }, { name: 'Вода' }];

const offers = [
    {
        title: 'Бесплатный сыр',
        text: 'Бесплатный сыр только в мышеловке, но тем не менее не проходите мимо!',
        url: 'https://www.ozon.ru/product/syr-50-lamber-230-g-146885658',
    },
    {
        title: 'Natura Selection с белой плесенью',
        text: 'Классический сыр с белой плесенью Brie имеет плотную корочку, нежную текстуру и сливочный вкус',
        url: 'https://www.ozon.ru/product/syr-s-beloy-plesenyu-castello-brie-125-g-148419473',
    },
    {
        title: 'Бисквитное печенье Delisana Jaffa cakes',
        text: 'Порадуйте себя и своих близких невероятно вкусным печеньем Delisana от крупного производителя Delicpol',
        url: 'https://www.ozon.ru/product/biskvitnoe-pechene-delisana-jaffa-cakes-s-vishnevym-zhele-v-yogurtovoy-glazuri-135-g-481970815',
    },
    {
        title: 'Сок охлажденный для иммунитета J7 Апельсин',
        text: 'Апельсиновый сок холодного хранения J7 Fresh Taste – это 100% сок без добавления сахара, который произведен с использованием щадящей технологии обработки и сохранил в себе витамины и свежий вкус спелых апельсинов. ',
        url: 'https://www.ozon.ru/product/sok-ohlazhdennyy-dlya-immuniteta-j7-apelsin-0-85l-175332317',
    },
    {
        title: 'ФрутоНяня вода артезианская питьевая',
        text: 'ФрутоНяня детская вода рекомендована для детей с первых дней жизни, не требует кипячения,  тщательно сбалансирована по минеральному составу. ',
        url: 'https://www.ozon.ru/product/frutonyanya-voda-artezianskaya-pitevaya-negazirovannaya-5-l-141824244',
    },
];

const fillDB = async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();

    // ? - как связать сущности? создать теги, а потом связать с офферами
    await prisma.user.create({ data: user });
    await prisma.topic.createMany({ data: topics }); // BatchPayload -> count
    await prisma.tag.createMany({ data: tags });
    await prisma.city.createMany({ data: cities });

    await prisma.offer.createMany({
        data: offers.map((offer) => {
            return {
                ...offer,
                cityId: getRandomItem([1, 2]),
                topicId: getRandomItem([1, 2, 3, 4]),
            };
        }),
    });

    // ? - так ли создаются связи m2m?
    // ? - как обработать ситуацию, если сущность создалась, а связь нет?
    await prisma.offerOnTag.createMany({
        data: [
            {
                offerId: 1,
                tagId: 1,
            },
            {
                offerId: 1,
                tagId: 2,
            },
            {
                offerId: 1,
                tagId: 3,
            },
        ],
    });

    await prisma.userOnTopic.createMany({
        data: [
            {
                userId: 1,
                topicId: 1,
            },
            {
                userId: 1,
                topicId: 3,
            },
        ],
    });
};

// ? - какой командой можно почистить базу (данные), чтобы она сбросилась в ноль?
fillDB();

// ? - миграции, какие есть нюансы? насколько можно отклониться от первоначальных моделей?