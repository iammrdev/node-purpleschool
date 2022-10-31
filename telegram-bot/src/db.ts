import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const getDB = async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();

    const offers = await prisma.offer.findMany({
        include: {
            // ? - как получить только нужные поля - имена топиков (name)
            //"topic": {
            //   "id": 3,
            //   "name": "Продукты питания"
            // },
            topic: true,
            city: true,
            // ? - как получить только нужные поля - имена тегов (tagName)
            // "tags": [
            //     {
            //       "offerId": 1,
            //       "tagId": 1,
            //       "createdAt": "2022-10-30T21:56:27.499Z",
            //       "updatedAt": "2022-10-30T21:56:27.499Z"
            //     }
            // ]
            tags: true,
        },
    });
    console.log(JSON.stringify(offers, null, 2));
};

getDB();
