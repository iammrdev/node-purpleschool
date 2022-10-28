import { bus, EVENTS } from "../core/bus.js";
import { withEmitResult } from "../core/withEmitResult.js";

export const division = (a, b) => a / b;

bus.on(EVENTS.DIVISION, withEmitResult(division));
