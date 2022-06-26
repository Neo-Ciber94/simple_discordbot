import { ICommand } from "../types/ICommand";
import { CommandInteraction } from "discord.js";
import { DiscordBotContext } from "./discordbot";

export class CommandHandler {
  readonly commands = new Map<string, ICommand>();

  constructor(commands: ICommand[]) {
    for (const command of commands) {
      const name = command.info.name;
      this.commands.set(name, command);
    }
  }

  get(name: string): ICommand | undefined {
    return this.commands.get(name);
  }

  async execute(
    name: string,
    context: DiscordBotContext,
    interaction: CommandInteraction
  ): Promise<boolean> {
    const command = this.get(name);

    if (command == null) {
      return false;
    }

    await command.execute(interaction, context);
    return true;
  }
}
