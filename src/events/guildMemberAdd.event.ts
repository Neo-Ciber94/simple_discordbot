import { createListener } from "../utils/createListener";
import logger from "../logger";
import { Client, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import * as config from "../config";

const CHANNEL_ID = config.GENERAL_CHANNEL_ID;

export default createListener({
  event: "guildMemberAdd",
  execute: (context, member) => sendWelcomeMessage(context.client, member),
});

export async function sendWelcomeMessage(client: Client, member: GuildMember) {
  const botUser = client.user;
  const newUser = member.user;
  const serverName = member.guild.name;

  const channel = member.guild.channels.cache.find(
    (c) => c.id === CHANNEL_ID
  ) as TextChannel;

  if (botUser == null) {
    logger.error("Bot user cannot be found");
    return;
  }

  if (channel == null) {
    logger.error(`Channel '${CHANNEL_ID}' was not found`);
    return;
  }

  const messageEmbed = new MessageEmbed();
  messageEmbed.setAuthor({
    name: botUser.username,
    iconURL: botUser.avatarURL() as string,
  });

  messageEmbed.setTitle(`Welcome to **${serverName}**!`);
  messageEmbed.setThumbnail(newUser.avatarURL() as string);
  messageEmbed.setTimestamp(new Date());
  messageEmbed.setDescription(
    `**${newUser.username}** welcome to the **${serverName}** bot test server, feel free to use it`
  );
  messageEmbed.setFields([
    {
      name: `Bot name`,
      value: botUser.username,
      inline: true,
    },
    {
      name: "Try it",
      value: `Use **/waifu** to test the bot`,
    },
    {
      name: "Rules:",
      value: "(1) Don't be naughty\n(2) Forget about rule 1",
    },
  ]);
  messageEmbed.setImage(botUser.avatarURL() as string);

  messageEmbed.setFooter({
    text: `**${serverName}** ${new Date().getFullYear()}`,
    iconURL: botUser.avatarURL() as string,
  });

  await channel.send({
    embeds: [messageEmbed],
  });
}
