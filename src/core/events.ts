/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from "fs";
import * as path from "path";
import { IEventListener } from "../types/IEventListener";

export function loadEventListeners(
  eventListenerDir: string
): IEventListener<any>[] {
  const listeners: IEventListener<any>[] = [];
  const eventListenersPath = path.join(__dirname, eventListenerDir);
  const eventListenerFiles = fs
    .readdirSync(eventListenersPath)
    .filter((f) => f.endsWith(".js"));

  for (const file of eventListenerFiles) {
    const eventListenerPath = path.join(eventListenersPath, file);
    const { default: obj } = require(eventListenerPath); // Is only run once, not problem with be sync

    const listener = obj as Partial<IEventListener<any>>;

    if (
      typeof obj === "object" &&
      listener &&
      listener.event &&
      listener.execute
    ) {
      listeners.push(listener as IEventListener<any>);
    }
  }

  return listeners;
}
