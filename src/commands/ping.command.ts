import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { ICommand } from "../types/ICommand";

class PingCommand implements ICommand {
  readonly builder = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!");

  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply("Pong!");
  }
}

export default new PingCommand();
