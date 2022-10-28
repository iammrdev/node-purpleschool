import chalk from "chalk";

export class Logger {
  static logError(error) {
    console.log(chalk.bgRed.black(" ERROR "), error);
  }

  static logSuccess(message) {
    console.log(chalk.bgGreen.black(" SUCCESS "), message);
  }
}
