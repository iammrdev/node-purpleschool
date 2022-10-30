import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { setupBot } from './bot';

(async function () {
    try {
        const prisma = new PrismaClient();
        await prisma.$connect();

        const bot = setupBot();
        await bot.launch();
        console.log('</ Бот успешно запущен >');
    } catch (error) {
        console.log('Ошибка запуска: ', error);
    }
})();
