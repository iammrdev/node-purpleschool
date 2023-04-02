import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { setupBot } from './bot/bot';
import { ConfigService } from './bot/config/config.service';
import { Config } from './bot/config/config.interface';
import { initApi } from './api';

const initApp = async (config: Config) => {
    try {
        const prisma = new PrismaClient();
        await prisma.$connect();

        const { bot, botMethods } = setupBot({ prisma });
        await bot.launch();

        initApi(config, { prisma, botMethods });

        console.log('</ Бот успешно запущен >');
    } catch (error) {
        console.log('Ошибка запуска: ', error);
    }
};

initApp(new ConfigService());
