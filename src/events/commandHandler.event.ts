import { CommandHandler } from "../core/command-handler";
import logger from "../logger";
import { createListener } from "../utils/createListener";

let commandHandler: CommandHandler;

export default createListener({
  event: "interactionCreate",
  async execute(context, interaction) {
    if (interaction == null || !interaction.isCommand()) {
      return;
    }

    // We only create the handler once
    commandHandler ??= new CommandHandler(context.commands);

    const { commandName } = interaction;
    try {
      const result = await commandHandler.execute(
        commandName,
        context,
        interaction
      );
      if (result == false) {
        logger.error(`Command '${commandName}' was not found`);
      }
    } catch (e) {
      logger.error(e);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
});
