import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CollectorFilter,
  CommandInteraction,
  Message,
  MessageEmbed,
  MessageReaction,
} from "discord.js";
import { DiscordBotContext } from "../core/discordbot";
import logger from "../logger";
import { createCommand } from "../utils/createCommand";

export default createCommand({
  info: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates a poll")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("yesno")
        .setDescription("Creates a yes/no poll")
        .addStringOption((option) =>
          option
            .setName("question")
            .setDescription("Question to ask")
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("duration")
            .setDescription("Duration of the poll")
            .setMinValue(5)
            .setMaxValue(120)
        )
    )
    .toJSON(),
  async execute(interaction, context) {
    const subcommand = interaction.options.getSubcommand(true);
    switch (subcommand) {
      case "yesno":
        return createYesNoPoll(interaction, context);
      default:
        await interaction.reply(`Invalid subcommand **${subcommand}** ⚠`);
        break;
    }
  },
});

async function createYesNoPoll(
  interaction: CommandInteraction,
  context: DiscordBotContext
) {
  const question = interaction.options.getString("question", true);
  const durationSeconds = interaction.options.getNumber("duration") || 30;

  await interaction.reply(
    `**${question}** (${durationSeconds} seconds)\n\nVote with 👍 or 👎`
  );

  const channel = interaction.channel;

  if (channel == null) {
    await interaction.editReply(`Invalid channel ⚠`);
    logger.error(
      `Unable to create poll in channel with id: ${interaction.channelId}`
    );
    return;
  }

  const replyToMessage = (await interaction.fetchReply()) as Message;

  const filter: CollectorFilter<[MessageReaction]> = (reaction) => {
    return true;
  };

  const time = durationSeconds * 1000;
  const collector = replyToMessage.createReactionCollector({
    time,
    filter,
    max: 1000,
  });

  collector.on("end", async (collected) => {
    // TODO: Check uniqueness
    const yesTotal = collected.filter((c) => c.emoji.name === "👍");
    const noTotal = collected.filter((c) => c.emoji.name === "👎");

    const yesCount = yesTotal.size;
    const noCount = noTotal.size;

    let message: string;

    if (yesCount === noCount) {
      message = "Is a match!";
    } else if (yesCount > noCount) {
      message = `👍 won with **${yesCount}** votes!`;
    } else {
      message = `👎 won with **${noCount}** votes!`;
    }

    const user = interaction.user;
    const messageEmbed = new MessageEmbed();
    messageEmbed.setAuthor({
      name: user.username,
      iconURL: user.avatarURL() as string,
    });

    messageEmbed.setTitle(question);
    messageEmbed.setThumbnail(context.user.avatarURL() as string);
    messageEmbed.setFields(
      {
        name: "Results",
        value: `👍 **${yesCount}** vs 👎 **${noCount}**`,
      },
      {
        name: "Winner",
        value: message,
      }
    );

    await channel.send({
      reply: {
        messageReference: replyToMessage as Message,
      },
      embeds: [messageEmbed],
    });
  });
}
