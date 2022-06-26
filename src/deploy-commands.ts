import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { loadCommands } from "./commands";
import * as config from "./config";

async function run() {
  const commands = await loadCommands("./commands");
  const commandsJsonBody = commands.map((c) => c.info);
  const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

  rest
    .put(
      Routes.applicationGuildCommands(config.APPLICATION_ID, config.SERVER_ID),
      { body: commandsJsonBody }
    )
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}

run().catch(console.error);
