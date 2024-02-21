import { Command } from "../types";


let attackRunning: boolean = false
const command: Command = {
    name: "attack", 
    usage: "attack <start|stop> <delayMS> <mobType>...",
    execute: (bot, sender, args) => {
        let [startOrStop, _delay, ...mobTypes] = args
        if (startOrStop === "stop") {
            attackRunning = false
        } else if (startOrStop === "start") {
            if (attackRunning) {
                bot.chat(`/w ${sender} <red>Auto attack is already running.`)
                return
            }
            let delay = parseInt(_delay)
            if (delay < 500 || delay > 10000) {
                bot.chat(`/w ${sender} <red>Delay must be between 500 and 10000`)
                return
            }
            attackRunning = true
            let autoAttack = () => {
                try {
                    let entity = bot.nearestEntity((entity) => mobTypes.includes(entity.name))
                    bot.attack(entity)
                } catch (e){
                    console.log(e)
                } finally {
                    if (attackRunning) {
                        setTimeout(autoAttack, delay)
                    }
                }
            }
            setTimeout(autoAttack, delay)
        }
    }
}

export = command