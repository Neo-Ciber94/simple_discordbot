import { SlashCommandBuilder } from "@discordjs/builders";
import { Channel, TextBasedChannel, User } from "discord.js";
import logger from "../logger";
import { createCommand } from "../utils/createCommand";

export interface AnnoyUser {
  user: User;
  channel: TextBasedChannel;
}

const annoyuserList = new Map<string, AnnoyUser>();

export function getAnnoyUserList() {
  return new Map(annoyuserList);
}

export default createCommand({
  info: new SlashCommandBuilder()
    .setName("annoyme")
    .setDescription("Annoy me")
    .toJSON(),
  execute: async (interaction) => {
    const user = interaction.user;
    const channel = interaction.channel;

    if (channel == null) {
      logger.error(`Unable to find the channel for user #${user.id}`);
      return;
    }

    if (annoyuserList.has(user.id)) {
      annoyuserList.delete(user.id);
      await interaction.reply("Bot will stop to annoy you 😇");
    } else {
      annoyuserList.set(user.id, { user, channel });
      await interaction.reply("Bot will annoy you 😈");
    }
  },
});
