import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { CommandInteraction, CacheType } from "discord.js";
import { DiscordBotContext } from "../core/discordbot";
import { sendWelcomeMessage } from "../events/guildMemberAdd.event";
import logger from "../logger";
import { ICommand } from "../types/ICommand";

class WelcomeCommand implements ICommand {
  info: RESTPostAPIApplicationCommandsJSONBody = new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Show a welcome message")
    .toJSON();

  async execute(
    interaction: CommandInteraction<CacheType>,
    context: DiscordBotContext
  ): Promise<void> {
    const client = context.client;
    const channelId = interaction.channelId;
    const userId = interaction.user.id;
    const guild = interaction.guild;

    if (guild == null) {
      logger.error(`Unable to find guild for user #${userId}`);
      return;
    }

    const members = await guild.members.list();
    const member = members.find((m) => m.user.id === userId);

    if (member == null) {
      logger.error(`Unable to find member with id #${userId}`);
      return;
    }

    await interaction.reply("Welcome!");
    await sendWelcomeMessage(client, member, channelId);
  }
}

export default new WelcomeCommand();
