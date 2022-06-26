[![CI](https://github.com/Neo-Ciber94/simple_discordbot/actions/workflows/ci.yml/badge.svg)](https://github.com/Neo-Ciber94/simple_discordbot/actions/workflows/ci.yml)

# Simple Discord Bot

A simple framework to create events and commands for a discord bot using `discord.js`

## Usage

Rename `.env.sample` to `.env` and add the required values.
Checkout https://discordjs.guide/#before-you-begin for more information.

### Creating Commands

To create a new command add it to the `src/commands/` is not required to use the suffix `.command.ts` that's just a convention.
You can use the helper method `createCommand` or implement `ICommand`, both require to export the instance as `default`.

> Using `ICommand`

```ts
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType } from "discord.js";
import { ICommand } from "../types/ICommand";

class PingCommand implements ICommand {
  readonly info = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")
    .toJSON();

  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.reply("Pong!");
  }
}

export default new PingCommand();
```

> Using `createCommand`

```ts
import { SlashCommandBuilder } from "@discordjs/builders";
import { createCommand } from "../utils/createCommand";

export default createCommand({
  info: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")
    .toJSON(),
  execute: (interaction) => interaction.reply("Pong!"),
});
```

### Creating Event Listeners

To create an event listener add it to the `src/events/` is not required to use the suffix `.event.ts` that's just other convention. You can use the helper method `createListener` or implement `IEventListener<K>`, both require to export the instance as `default`.

> Using `IEventListener<K>`

```ts
import { Message } from "discord.js";
import { DiscordBotContext } from "../core/discordbot";
import { IEventListener } from "../types/IEventListener";

class EchoEventListener implements IEventListener<"messageCreate"> {
  readonly event = "messageCreate";

  async execute(
    context: DiscordBotContext,
    message: Message<boolean>
  ): Promise<void> {
    const messageAuthorId = message.author.id;
    const botUserId = context.client.user?.id;

    if (messageAuthorId === botUserId) {
      return;
    }

    await message.reply(message.content);
  }
}

export default new EchoEventListener();
```

> Using `createListener`

```ts
import { createListener } from "../utils/createListener";

export default createListener({
  event: "messageCreate",
  async execute(context, message) {
    const messageAuthorId = message.author.id;
    const botUserId = context.client.user?.id;

    if (messageAuthorId === botUserId) {
      return;
    }

    await message.reply(message.content);
  },
});
```
