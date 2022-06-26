import * as config from "./config";
import { Client, Intents } from "discord.js";
import { CommandHandler } from "./commands/command-handler";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function main() {
  const commandHandler = await CommandHandler.fromCommandsDir("./commands");

  client.once("ready", () => {
    console.log("Ready!");
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction == null || !interaction.isCommand()) {
      return;
    }

    const { commandName } = interaction;

    try {
      if (!(await commandHandler.execute(commandName, interaction))) {
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
