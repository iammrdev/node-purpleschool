import { EventEmitter } from "events";

export const EVENTS = {
  ADD: "add",
  SUBTRACTION: "subtraction",
  MULTIPLY: "multiply",
  DIVISION: "division",
  RESULT: "result",
};

export const bus = new EventEmitter();
