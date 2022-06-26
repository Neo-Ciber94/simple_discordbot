/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from "fs";
import * as path from "path";
import { ICommand } from "../types/ICommand";

export function loadCommands(commandsDir: string): ICommand[] {
  const commands: ICommand[] = [];
  const commandsPath = path.join(__dirname, commandsDir);

  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((f) => f.endsWith(".js"));

  for (const file of commandFiles) {
    const commandFilePath = path.join(commandsPath, file);
    const { default: obj } = require(commandFilePath); // Is only run once, not problem with be sync

    const command = obj as Partial<ICommand>;
    if (
      typeof obj === "object" &&
      command &&
      command.builder &&
      command.execute
    ) {
      commands.push(command as ICommand);
    }
  }

  return commands;
}
