import { Worker } from "worker_threads";

export const workerFileReader = (path) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./core/worker.js", {
      workerData: {
        path,
      },
    });

    worker.on("message", (message) => {
      resolve(message);
    });

    worker.on("error", (error) => {
      reject(error);
    });

    worker.on("exit", () => {
      console.log("Done");
    });
  });
};
