import { Command } from "../types";
import chatQueue from "../utils/chatQueue";
const command: Command = {
    name: "tp",
    usage: "Usage: tp <id>",
    execute: async (bot, sender, args) => {
        let islandId = args[0]
        if (islandId === undefined) {
            chatQueue([
                `/w ${sender} <red>你需要提供島嶼id。<newline><white>用法: ${command.usage}`
            ]
            )
            return
        }
        chatQueue([
            `/visit id ${islandId}`,
            `/w ${sender} <aqua>已傳送到島嶼 #${islandId}`
        ])
    }
}

export default command