import fs from "fs";

let counter = 0;

export const fileReader = async (directory) => {
  let data = fs.readdirSync(directory);

  for (const element of data) {
    const path = `${directory}${element}/`;

    const stat = fs.statSync(path);

    if (stat.isFile()) {
      counter += 1;
    } else {
      try {
        await fileReader(path, counter);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return counter;
};
