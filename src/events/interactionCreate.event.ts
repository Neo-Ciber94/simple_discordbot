import logger from "../logger";
import { createListener } from "../utils/createListener";

export default createListener({
  event: "interactionCreate",
  execute(_, interaction) {
    const channelId = interaction.channel?.id;

    logger.info(
      `${interaction.user.tag} in #${channelId} triggered an interaction.`
    );
  },
});
