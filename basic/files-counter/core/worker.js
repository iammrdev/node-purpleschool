import { parentPort, workerData } from "worker_threads";
import { fileReader } from "./fileReader.js";

const readFiles = async () => {
  const result = await fileReader(workerData.path);
  await parentPort.postMessage(result);
};

readFiles();
