import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import fetch from "node-fetch";
import { ICommand } from "../types/ICommand";

export enum Category {
  SFW = "sfw",
  NSFW = "nsfw",
}

type RandomWaifuResponse = {
  url: string;
};

class RandomWaifuCommand implements ICommand {
  readonly builder = new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Gets a random waifu image")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The image category")
        .setChoices(
          { name: Category.SFW, value: Category.SFW },
          { name: Category.NSFW, value: Category.NSFW }
        )
    );

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
