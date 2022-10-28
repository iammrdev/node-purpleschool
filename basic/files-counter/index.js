import { workerFileReader } from "./core/workerFileReader.js";

const path = `../../../../mwm-marketplace/frontend/node_modules/`;
const path2 = `../../../../node-six-cities/node_modules/`;

const init = async () => {
  performance.mark("start");
  console.log(
    await Promise.all([workerFileReader(path), workerFileReader(path2)])
  );
  performance.mark("end");
  performance.measure("main", "start", "end");
  console.log(performance.getEntriesByName("main").pop());
};

init();
