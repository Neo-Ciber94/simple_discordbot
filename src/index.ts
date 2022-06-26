import * as config from "./config";
import { Client, Intents } from "discord.js";
import { CommandHandler } from "./commands/command-handler";
import { loadCommands } from "./commands";
import { deployCommands } from "./deploy-commands";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function main() {
  const commands = await loadCommands("./commands");
  const commandHandler = new CommandHandler(commands);
  await deployCommands(commands);

  client.once("ready", () => {
    console.log("Ready!");
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction == null || !interaction.isCommand()) {
      return;
    }

    const { commandName } = interaction;

    try {
      const result = await commandHandler.execute(commandName, interaction);
      if (result == false) {
        console.error(`Command '${commandName}' was not found`);
      }
    } catch (e) {
      console.error(e);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.login(config.DISCORD_TOKEN);
}

main().catch(console.error);
