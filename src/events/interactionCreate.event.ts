import { createListener } from "../utils/createListener";

export default createListener({
  event: "interactionCreate",
  execute(_, interaction) {
    const channelId = interaction.channel?.id;

    console.log(
      `${interaction.user.tag} in #${channelId} triggered an interaction.`
    );
  },
});
