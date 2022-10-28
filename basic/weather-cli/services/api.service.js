import axios from "axios";
import { Storage } from "./storage.service.js";

const client = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  withCredentials: true,
  params: {
    units: "metric",
    lang: "ru",
  },
});

export class OpenWeatherAPI {
  static async getWeather(city) {
    const config = await Storage.getValues();

    if (!config.token) {
      throw new Error(
        "Не задан ключ API, задайте его через команду: -t [API_KEY]"
      );
    }
    const { data } = await client.get("weather", {
      params: {
        q: city,
        appid: process.env.TOKEN || config.token,
      },
    });

    return data;
  }
}
