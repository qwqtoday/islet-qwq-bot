import { Command } from "../types";

const command: Command = {
    name: "info", 
    usage: "command",
    execute: (bot, sender, args) => {
        bot.chat(`/w ${sender} bot version: ${bot.version}`)
    }
}

export = command