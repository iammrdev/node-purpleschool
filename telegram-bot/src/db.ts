import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const getDB = async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();

    const offers = await prisma.offer.findMany({
        include: {
            topic: true,
            city: true,
            tags: true,
        },
    });
    console.log(JSON.stringify(offers, null, 2));
};

getDB();
