import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";
import { DiscordBotContext } from "../core/discordbot";

export interface ICommand {
  readonly info: RESTPostAPIApplicationCommandsJSONBody;
  execute(
    interaction: CommandInteraction,
    context: DiscordBotContext
  ): Promise<void> | void;
}
