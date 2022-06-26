import { ClientEvents } from "discord.js";
import { DiscordBotContext } from "../core/discordbot";

export interface IEventListener<K extends keyof ClientEvents> {
  event: K;
  once?: boolean;
  execute(
    context: DiscordBotContext,
    ...args: ClientEvents[K]
  ): Promise<void> | void;
}
