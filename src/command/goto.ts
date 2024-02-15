import { Command } from "../types";
import { goals } from 'mineflayer-pathfinder';
const command: Command = {
    name: "goto", 
    usage: "goto <x> <y> <z>",
    execute: async (bot, sender, args) => {
        let [x, y, z] = [parseInt(args[0]), parseInt(args[1]), parseInt(args[2])]

        try {
            await bot.pathfinder.goto(new goals.GoalNear(x, y, z, 0.5))
        } catch {}
    }
}

export default command