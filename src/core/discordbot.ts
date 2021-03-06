/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, User } from "discord.js";
import logger from "../logger";
import { ICommand } from "../types/ICommand";
import { IEventListener } from "../types/IEventListener";
import { getArray } from "../utils/getArray";
import { loadCommands } from "./commands";
import { deployCommands } from "./deploy-commands";
import { loadEventListeners } from "./events";
import * as kleur from "kleur";

export interface DiscordBotOptions {
  client: Client;
  commands?: ICommand[];
  listeners?: IEventListener<any>[];
  commandsDir?: string | string[];
  listenersDir?: string | string[];
}

export interface DiscordBotContext {
  user: User;
  client: Client;
  commands: ICommand[];
  listeners: IEventListener<any>[];
  startTime: Date;
}

export class DiscordBot {
  public readonly client: Client;
  #startTime?: Date;
  #commands: ReadonlyArray<ICommand>;
  #listeners: ReadonlyArray<IEventListener<any>>;

  constructor(options: DiscordBotOptions) {
    const client = options.client;
    const commands: ICommand[] = [];
    const listeners: IEventListener<any>[] = [];

    if (options.commandsDir) {
      for (const dir of getArray(options.commandsDir)) {
        commands.push(...loadCommands(dir));
      }
    }

    if (options.listenersDir) {
      for (const dir of getArray(options.listenersDir)) {
        listeners.push(...loadEventListeners(dir));
      }
    }

    this.client = client;
    this.#commands = commands;
    this.#listeners = listeners;
  }

  #getContext(): DiscordBotContext {
    return {
      user: this.client.user!,
      client: this.client,
      commands: [...this.#commands],
      listeners: [...this.#listeners],
      startTime: this.#startTime ?? new Date(), // This is not the actual start date
    };
  }

  #logCommands() {
    for (const command of this.#commands) {
      logger.debug(`Command ${kleur.green(command.info.name)} was registered`);
    }
  }

  #logListeners() {
    for (const listeners of this.#listeners) {
      logger.debug(
        `Listener for event ${kleur.green(listeners.event)} was registered`
      );
    }
  }

  /**
   * Register the commands and listeners and login into the discord server.
   * @param token The discord server token.
   */
  async loginAndStart(token: string) {
    try {
      await deployCommands([...this.#commands]);
      logger.debug("Successfully deployed application commands");
    } catch (e) {
      logger.error(e);
      throw e;
    }

    for (const listener of this.#listeners) {
      if (listener.once === true) {
        this.client.once(listener.event, (args) =>
          listener.execute(this.#getContext(), args)
        );
      } else {
        this.client.on(listener.event, (args) =>
          listener.execute(this.#getContext(), args)
        );
      }
    }

    // Debug information
    this.#logCommands();
    this.#logListeners();

    await this.client.login(token);
    this.#startTime = new Date();
    logger.info("Discord bot is running...");
  }
}
