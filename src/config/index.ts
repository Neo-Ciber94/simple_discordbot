/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from "dotenv";
dotenv.config();

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
export const APPLICATION_ID = process.env.APPLICATION_ID!;
export const SERVER_ID = process.env.SERVER_ID!;
export const ALLOW_NSFW = process.env.ALLOW_NSFW === "true";
export const GENERAL_CHANNEL_ID = process.env.GENERAL_CHANNEL_ID!;
