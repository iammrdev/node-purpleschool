import getYargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import app from "./modules/app.js";

const init = () => {
  const yargs = getYargs(hideBin(process.argv));

  yargs
    .scriptName("node weather.js")
    .usage("$0 <cmd> [args]")
    .command(app.command, app.description, app.builder, app.handler)
    .parse();
};

init();
