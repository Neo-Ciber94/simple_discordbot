import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { ICommand } from "./interfaces/ICommand";

class PingCommand implements ICommand {
  readonly info = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")
    .toJSON();

  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply("Pong!");
  }
}

export default new PingCommand();
