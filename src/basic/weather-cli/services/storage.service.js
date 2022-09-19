import { homedir } from "os";
import { promises } from "fs";
import path from "path";

const filePath = path.join(homedir(), "weather-data.json");

export class Storage {
  static async _isExist(path) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  static async saveValueByKey(key, value) {
    let data = {};

    if (await Storage._isExist(filePath)) {
      const file = await promises.readFile(filePath);
      data = JSON.parse(file.toString());
    }

    data[key] = value;

    await promises.writeFile(filePath, JSON.stringify(data));
  }

  static async getValues() {
    if (await Storage._isExist(filePath)) {
      const file = await promises.readFile(filePath);
      const data = JSON.parse(file.toString());

      return data;
    }

    return {};
  }

  static async getValueByKey(key) {
    const data = await Storage.getValues();

    return data[key];
  }
}
