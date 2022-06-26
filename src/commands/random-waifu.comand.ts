import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import fetch from "node-fetch";
import { ICommand } from "./interfaces/ICommand";

export enum Category {
  SFW = "sfw",
  NSFW = "nsfw",
}

type RandomWaifuResponse = {
  url: string;
};

class RandomWaifuCommand implements ICommand {
  readonly info = new SlashCommandBuilder()
    .setName("waifu")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The image category")
        .setChoices(
          { name: Category.SFW, value: Category.SFW },
          { name: Category.NSFW, value: Category.NSFW }
        )
    )
    .setDescription("Gets a random waifu image")
    .toJSON();

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    await interaction.reply("Searching image..."); // We defer the reply to avoid timeout

    const category = interaction.options.getString("category") || Category.SFW;
    const res = await fetch(`https://api.waifu.pics/${category}/waifu`);

    if (!res.ok) {
      throw new Error(`${res.status} - ${res.statusText}`);
    }

    const json = (await res.json()) as RandomWaifuResponse;
    const { url } = json;
    await interaction.editReply({ files: [url] });
  }
}

export default new RandomWaifuCommand();
