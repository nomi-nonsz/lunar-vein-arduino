import readline from "node:readline/promises";
import chalk from "chalk";
import { Board } from "johnny-five";

import { selectPort } from "./ports";
import { run } from "./server";
import { suBoard } from "./setup";
import { cfg } from "./setup/config";
import { getPublicIp } from "./utils/network";

async function questions () {
  const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const exposeHost = await line.question("Run in public network? (y/n) ");
  
  if (exposeHost.toLowerCase() == "y") {
    console.warn(chalk.yellow("Running a server on a public host may not be able to use the socket.io api"));
    cfg.server.host = getPublicIp();
  }

  line.close();
}

export default async function main () {
  const port = await selectPort();
  await questions();

  console.log(`Selected port ${port}`);

  cfg.port = port;
  suBoard.board = new Board({
    port: port,
    debug: false,
    repl: false
  });
  run();
}