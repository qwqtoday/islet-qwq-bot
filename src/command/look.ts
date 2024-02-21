import { Command } from "../types";


const compassYaw = {
    "north": 0,
    "east": 1.5*Math.PI,
    "south": Math.PI,
    "west": 0.5*Math.PI,
}
const command: Command = {
    name: "look", 
    usage: "look",
    execute: async (bot, sender, args) => {
        let [direction] = args
        if (Object.keys(compassYaw).includes(direction)) {
            let yaw = compassYaw[direction]
            const pitch = 0
            await bot.look(yaw, pitch)
        } else {
            let [_yaw, _pitch] = direction.split(",")
            let yaw = parseFloat(_yaw)
            let pitch = parseFloat(_pitch)
            await bot.look(yaw, pitch)
        }
    }
}

export = command