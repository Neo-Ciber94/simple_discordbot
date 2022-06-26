import { ClientEvents } from "discord.js";
import { DiscordBotContext } from "../core/discordbot";
import { IEventListener } from "../types/IEventListener";

export type CreateListenerOptions<K extends keyof ClientEvents> = {
  event: K;
  once?: boolean;
  execute: (
    context: DiscordBotContext,
    ...args: ClientEvents[K]
  ) => Promise<void> | void;
};

// Nothing fancy, just forwards
export function createListener<K extends keyof ClientEvents>(
  options: CreateListenerOptions<K>
): IEventListener<K> {
  return { ...options };
}
