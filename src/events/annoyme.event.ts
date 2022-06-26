import { getAnnoyUserList } from "../commands/annoyme.command";
import { createListener } from "../utils/createListener";
import * as path from "path";
import * as fs from "fs";
import { Lazy } from "../utils/lazy";
import { MessageAttachment } from "discord.js";

const IMAGE_PATH = path.join(
  process.cwd(),
  "assets",
  "images",
  "spongebob_chicken.jpg"
);

const spongeBobChickenImage = new Lazy(() => {
  return fs.readFileSync(IMAGE_PATH);
});

export default createListener({
  event: "message",
  async execute(_, message) {
    const user = message.author;
    const annoyUsers = getAnnoyUserList();

    if (!annoyUsers.has(user.id)) {
      return;
    }

    const annoyingMessage = getAnnoyingMessage(message.content);
    const canUseImage = Math.random() > 0.7;
    const attachment = new MessageAttachment(spongeBobChickenImage.value);

    await message.reply({
      content: annoyingMessage,
      files: canUseImage ? [attachment] : [],
    });
  },
});

function getAnnoyingMessage(msg: string): string {
  return msg
    .split("")
    .map((s, idx) => (idx % 2 === 0 ? s.toLowerCase() : s.toUpperCase()))
    .join("");
}
