import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { ICommand } from "../types/ICommand";

class UserCommand implements ICommand {
  readonly info = new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info!")
    .toJSON();

  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
}

export default new UserCommand();
