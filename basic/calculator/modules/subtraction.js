import { bus, EVENTS } from "../core/bus.js";
import { withEmitResult } from "../core/withEmitResult.js";

export const subtraction = (a, b) => a - b;

bus.on(EVENTS.SUBTRACTION, withEmitResult(subtraction));
