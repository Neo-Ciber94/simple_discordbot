import { SlashCommandBuilder } from "@discordjs/builders";
import { createCommand } from "../utils/createCommand";

export default createCommand({
  info: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")
    .toJSON(),
  execute: (interaction) => interaction.reply("Pong!"),
});
