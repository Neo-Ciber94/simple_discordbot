import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import fetch from "node-fetch";
import logger from "../logger";
import { ICommand } from "../types/ICommand";
import * as config from "../config";

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
    .setDescription("Gets a random waifu image")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The image category")
        .setChoices(
          { name: Category.SFW, value: Category.SFW },
          { name: Category.NSFW, value: Category.NSFW }
        )
    )
    .toJSON();

  async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
    await interaction.reply("Searching image..."); // We defer the reply to avoid timeout
    const category = config.ALLOW_NSFW
      ? interaction.options.getString("category") || Category.SFW
      : Category.SFW;

    const res = await fetch(`https://api.waifu.pics/${category}/waifu`);

    if (!res.ok) {
      const text = await res.text();
      logger.error(text);
      return;
    }

    const json = (await res.json()) as RandomWaifuResponse;
    const { url } = json;
    await interaction.editReply({ content: "Here your waifu", files: [url] });
  }
}

export default new RandomWaifuCommand();
