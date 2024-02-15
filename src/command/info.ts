import { Command } from "../types";
import chatQueue from "../utils/chatQueue";

const command: Command = {
    name: "info", 
    usage: "command",
    execute: (bot, sender, args) => {
        chatQueue([
            `/w ${sender} bot version: ${bot.version}`
        ])
    }
}

export default command