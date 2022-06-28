import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { CommandInteraction, CacheType } from "discord.js";
import { DiscordBotContext } from "../core/discordbot";
import { ICommand } from "../types/ICommand";

export interface CreateCommandOptions {
  info: RESTPostAPIApplicationCommandsJSONBody;
  execute: (
    interaction: CommandInteraction<CacheType>,
    context: DiscordBotContext
  ) => Promise<void> | void;
}

// Nothing fancy, just forwards
export function createCommand(options: CreateCommandOptions): ICommand {
  return { ...options };
}
