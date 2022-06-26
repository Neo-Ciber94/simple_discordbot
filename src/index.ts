import * as config from "./config";
import { Client, Intents } from "discord.js";
import { loadCommands } from "./core/commands";
import { deployCommands } from "./core/deploy-commands";
import { loadEventListeners } from "./core/events";
import * as path from "path";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
export const commands = loadCommands(path.join(__dirname, "commands"));
export const listeners = loadEventListeners(path.join(__dirname, "events"));

async function main() {
  await deployCommands(commands);

  for (const listener of listeners) {
    if (listener.once === true) {
      client.once(listener.event, listener.execute);
    } else {
      client.on(listener.event, listener.execute);
    }
  }

  client.login(config.DISCORD_TOKEN);
}

main().catch(console.error);
