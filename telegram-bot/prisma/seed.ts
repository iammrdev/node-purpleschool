import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fillDB = async () => {
    await prisma.$connect();

    await prisma.topic.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Продукты питания',
            offers: {
                create: [
                    {
                        title: 'Бесплатный сыр',
                        text: 'Бесплатный сыр только в мышеловке, но тем не менее не проходите мимо!',
                        url: 'https://www.ozon.ru/product/syr-s-beloy-plesenyu-castello-brie-125-g-148419473',
                        tags: {
                            create: [
                                {
                                    name: 'Зеленый',
                                },
                                {
                                    name: 'Оранжевый',
                                },
                            ],
                        },
                        city: {
                            create: {
                                name: 'Москва',
                            },
                        },
                    },
                ],
            },
        },
    });

    await prisma.topic.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Электроника',
            offers: {
                create: [
                    {
                        title: 'МультиФон',
                        text: 'СуперФон! Звони куда хочешь и бесплатно!',
                        url: 'https://www.multifon.ru',
                        tags: {
                            create: [
                                {
                                    name: 'Бесплатно',
                                },
                                {
                                    name: 'Телефон',
                                },
                            ],
                        },
                        city: {
                            create: {
                                name: 'Санкт-Петербург',
                            },
                        },
                    },
                ],
            },
        },
    });
};

fillDB();
