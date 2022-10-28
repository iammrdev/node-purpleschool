import { bus, EVENTS } from "../core/bus.js";
import { withEmitResult } from "../core/withEmitResult.js";

export const multiply = (a, b) => a * b;

bus.on(EVENTS.MULTIPLY, withEmitResult(multiply));
