import { ICommand } from "./interfaces/ICommand";
import { CommandInteraction } from "discord.js"

export class CommandHandler {
  readonly commands = new Map<string, ICommand>();

  constructor(commands: ICommand[]) {
    for (const c of commands) {
      this.commands.set(c.info.name, c);
    }
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
