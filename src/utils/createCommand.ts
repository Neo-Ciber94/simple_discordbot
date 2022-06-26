import { CommandInteraction, CacheType } from "discord.js";
import { ICommand, SlashCommandBuilderLike } from "../types/ICommand";

export interface CreateCommandOptions {
  builder: SlashCommandBuilderLike;
  execute: (interaction: CommandInteraction<CacheType>) => Promise<void>;
}

// Nothing fancy, just forwards
export function createCommand(options: CreateCommandOptions): ICommand {
  return { ...options };
}
