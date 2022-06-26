import * as fs from "fs/promises";
import * as path from "path";
import { ICommand } from "./commands/interfaces/ICommand";

export async function loadCommands(commandsDir: string): Promise<ICommand[]> {
  const commands: ICommand[] = [];
  const commandsPath = path.join(__dirname, commandsDir);
  const commandFiles = await fs
    .readdir(commandsPath)
    .then((files) => files.filter((f) => f.endsWith(".js")));

  for (const file of commandFiles) {
    const commandFilePath = path.join(commandsDir, file);
    const { default: obj } = await import(commandFilePath);

    if (typeof obj === "object" && obj.command && obj.execute) {
      const command = obj as ICommand;
      commands.push(command);
    }
  }

  return commands;
}
