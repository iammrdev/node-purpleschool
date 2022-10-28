import { bus, EVENTS } from "../core/bus.js";
import { withEmitResult } from "../core/withEmitResult.js";

export const add = (a, b) => a + b;

bus.on(EVENTS.ADD, withEmitResult(add));
