import { fileReader } from "./core/fileReader.js";

const path = `../../../../mwm-marketplace/frontend/node_modules/`;
const path2 = `../../../../node-six-cities/node_modules/`;

const init = async () => {
  performance.mark("start");

  console.log(await Promise.all([fileReader(path), fileReader(path2)]));

  performance.mark("end");
  performance.measure("main", "start", "end");
  console.log(performance.getEntriesByName("main").pop());
};

init();
