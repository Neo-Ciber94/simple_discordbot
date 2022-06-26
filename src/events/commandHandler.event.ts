import { commands } from "..";
import { CommandHandler } from "../core/command-handler";
import { createListener } from "../utils/createListener";

const commandHandler = new CommandHandler(commands);

export default createListener({
  event: "interactionCreate",
  async execute(interaction) {
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
  },
});
