import { Bot } from "mineflayer";

export interface Command {
    name: string,
    usage: string
    execute: (bot: Bot, sender: string, args: string[]) => void
}