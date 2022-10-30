import 'dotenv/config';

import { setupBot } from './bot';

(async function () {
    try {
        const bot = setupBot();
        await bot.launch();
        console.log('</ Бот успешно запущен >');
    } catch (error) {
        console.log('Ошибка запуска: ', error);
    }
})();
