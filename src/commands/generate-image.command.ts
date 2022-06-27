import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageAttachment } from "discord.js";
import logger from "../logger";
import { createCommand } from "../utils/createCommand";
import { generateImages } from "../utils/generateImage";
import { AbortController, AbortSignal } from "node-abort-controller";

// Report progress each 5s
const REPORT_RATE_MS = 5000;

export default createCommand({
  info: new SlashCommandBuilder()
    .setName("generate_image")
    .setDescription("Generate an image using an AI model")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The description of the image to generate")
        .setRequired(true)
    )
    .toJSON(),
  async execute(interaction) {
    const prompt = interaction.options.getString("prompt");

    if (prompt == null || prompt.trim().length === 0) {
      await interaction.reply("Prompt was empty");
      return;
    }

    await interaction.reply(
      "Generating images... **(this may time some minutes)**"
    );

    try {
      const abortController = new AbortController();
      const { signal } = abortController;

      reportProgress(interaction, signal);

      logger.info(`Generating images for prompt: ${prompt}`);
      const { images } = await generateImages(prompt);
      logger.info(`Generated ${images.length} images for prompt: ${prompt}`);

      abortController.abort();

      const attachments = images.map((img) => new MessageAttachment(img));
      await interaction.editReply({
        content: `Images for prompt: **${prompt}**`,
        files: attachments,
      });
    } catch (e) {
      logger.error(e);
      await interaction.editReply("Failed to generate images");
    }
  },
});

function reportProgress(interaction: CommandInteraction, signal: AbortSignal) {
  const interval = 1000;
  let totalMs = 0;

  const intervalId = setInterval(async () => {
    if (signal.aborted) {
      clearInterval(intervalId);
      return;
    }

    if (totalMs > 0 && totalMs % REPORT_RATE_MS === 0) {
      await interaction.editReply(
        `Generating images... ${totalMs / 1000} seconds`
      );
    }

    totalMs += interval;
  }, interval);

  signal.addEventListener("abort", () => {
    clearInterval(intervalId);
  });
}
