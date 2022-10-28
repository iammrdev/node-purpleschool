import chalk from "chalk";
import { OpenWeatherAPI } from "../services/api.service.js";
import { Logger } from "../services/log.service.js";
import { Storage } from "../services/storage.service.js";

const options = {
  token: {
    alias: "t",
    type: "string",
    description: "Установить OpenWeather API Key",
  },
  city: {
    alias: "c",
    type: "string",
    description: "Установить город по-умолчанию",
  },
  weather: {
    alias: "w",
    type: "string",
    description: "Получить погоду в городе",
  },
};

const builder = (yargs) => {
  yargs.options("token", options.token);
  yargs.options("city", options.city);
  yargs.options("weather", options.weather);
};

const handler = async (argv) => {
  try {
    if (argv.token) {
      await Storage.saveValueByKey("token", argv.token);
      Logger.logSuccess(`Токен сохранен. Значение: ${chalk.blue(argv.token)} `);
    }
    if (argv.city) {
      await Storage.saveValueByKey("city", argv.city);
      Logger.logSuccess(`Город сохранен. Значение: ${chalk.blue(argv.city)} `);
    }

    if (argv.weather !== undefined) {
      const city =
        argv.weather ||
        process.env.CITY ||
        (await Storage.getValueByKey("city"));

      const data = await OpenWeatherAPI.getWeather(city);

      console.log(data);
    }
  } catch (error) {
    Logger.logError(error.message);
  }
};

export default {
  command: "app [args]",
  description: "Weather CLI",
  builder,
  handler,
};
