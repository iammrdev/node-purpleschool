import "./modules/index.js";
import { bus, EVENTS } from "./core/bus.js";

const userArguments = process.argv.slice(2);

const [action, num1, num2] = userArguments;

bus.on(EVENTS.RESULT, (result) => {
  console.log(`result for operation: ${result}`);
});

bus.emit(action, parseInt(num1), parseInt(num2));
