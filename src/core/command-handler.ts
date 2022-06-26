import { ICommand } from "../types/ICommand";
import { CommandInteraction } from "discord.js";

type IExecutableCommand = Pick<ICommand, "execute"> & { name: string };

export class CommandHandler {
  readonly commands = new Map<string, IExecutableCommand>();

  constructor(commands: ICommand[]) {
    for (const command of commands) {
      const json = command.builder.toJSON();
      const name = json.name;

      this.commands.set(json.name, {
        name,
        execute: command.execute,
      });
    }
  }

  get(name: string): IExecutableCommand | undefined {
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
