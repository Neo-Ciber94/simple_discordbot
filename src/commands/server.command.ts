import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { ICommand } from "./interfaces/ICommand";

class ServerCommand implements ICommand {
  readonly info = new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!")
    .toJSON();

  async execute(interaction: CommandInteraction<CacheType>) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const guild = interaction.guild!;
    await interaction.reply(
      `Server name: ${guild.name}\nTotal members: ${guild.memberCount}`
    );
  }
}

export default new ServerCommand();
