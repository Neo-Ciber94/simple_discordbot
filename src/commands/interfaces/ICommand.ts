import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";

export interface ICommand {
  readonly info: RESTPostAPIApplicationCommandsJSONBody;
  execute(interaction: CommandInteraction): Promise<void>;
}
