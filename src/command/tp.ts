import { Command } from "../types";
const command: Command = {
    name: "tp",
    usage: "Usage: tp <id>",
    execute: async (bot, sender, args) => {
        let islandId = args[0]
        if (islandId === undefined) {
            bot.chat(`/w ${sender} <red>你需要提供島嶼id。<newline><white>用法: ${command.usage}`)
            return
        }
        bot.chat(`/visit id ${islandId}`)
        bot.chat(`/w ${sender} <aqua>已傳送到島嶼 #${islandId}`)
    }
}

export = command