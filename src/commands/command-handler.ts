import { ICommand } from "./interfaces/ICommand";
import { CommandInteraction } from "discord.js";
import { loadCommands } from "../commands";

export class CommandHandler {
  readonly commands = new Map<string, ICommand>();

  constructor(commands: ICommand[]) {
    for (const c of commands) {
      this.commands.set(c.info.name, c);
    }
  }

  static async fromCommandsDir(commandsDir: string): Promise<CommandHandler> {
    const commands = await loadCommands(commandsDir);
    return new CommandHandler(commands);
  }

  get(name: string): ICommand | undefined {
    return this.commands.get(name);
  }

  async execute(
    name: string,
    interaction: CommandInteraction
  ): Promise<boolean> {
    const command = this.get(name);

    if (command == null) {
      return false;
    }

    await command.execute(interaction);
    return true;
  }
}
