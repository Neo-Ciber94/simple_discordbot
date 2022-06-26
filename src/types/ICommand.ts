import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export type SlashCommandBuilderLike = Partial<SlashCommandBuilder> &
  Pick<SlashCommandBuilder, "toJSON">;

export interface ICommand {
  readonly builder: SlashCommandBuilderLike;
  execute(interaction: CommandInteraction): Promise<void> | void;
}
