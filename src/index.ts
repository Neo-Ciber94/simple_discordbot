import * as config from "./config";
import * as path from "path";
import { Client, Intents } from "discord.js";
import { DiscordBot } from "./core/discordbot";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const discordBot = new DiscordBot({
  client,
  commandsDir: path.join(__dirname, "commands"),
  listenersDir: path.join(__dirname, "events"),
});

discordBot.loginAndStart(config.DISCORD_TOKEN).catch(console.error);
