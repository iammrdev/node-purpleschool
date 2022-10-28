import { bus, EVENTS } from "./bus.js";

export const withEmitResult =
  (func) =>
  (...args) => {
    const result = func(...args);

    bus.emit(EVENTS.RESULT, result);

    return result;
  };
