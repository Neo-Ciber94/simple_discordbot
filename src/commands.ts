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
    const commandFilePath = path.join(commandsPath, file);
    const { default: obj } = await import(commandFilePath);

    const command = obj as Partial<ICommand>;
    if (typeof obj === "object" && command && command.info && command.execute) {
      commands.push(command as ICommand);
    }
  }

  return commands;
}
