import { ClientEvents } from "discord.js";

export interface IEventListener<K extends keyof ClientEvents> {
  event: K;
  once?: boolean;
  execute(...args: ClientEvents[K]): Promise<void> | void;
}
