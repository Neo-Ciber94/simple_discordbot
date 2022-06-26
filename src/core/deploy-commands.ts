import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ICommand } from "../types/ICommand";
import * as config from "../config";

export async function deployCommands(commands: ICommand[]) {
  const commandsJsonBody = commands.map((c) => c.builder.toJSON());
  const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

  rest
    .put(
      Routes.applicationGuildCommands(config.APPLICATION_ID, config.SERVER_ID),
      { body: commandsJsonBody }
    )
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}
