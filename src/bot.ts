import { verifyByUsername } from './api/auth';
import * as Config from './config';
import * as fs from 'fs';
import { Bot, createBot } from "mineflayer";
import { pathfinder, Movements } from 'mineflayer-pathfinder'
import { Command } from './types';
import MinecraftData = require('minecraft-data');
import { loadTaskPlugin } from './utils/task';
import { sleep } from './utils/sleep';

Config.loadConfig()
const args = process.argv.slice(2)
const instanceId = parseInt(args[0])
const instanceConfig = Config.getBotInstanceConfig(instanceId)

const BOT_USERNAME = instanceConfig.username
const BOT_VIEWDISTANCE = instanceConfig.view_distance

let commands: { [name: string]: Command } = {}
fs.readdirSync("./dist/command/").forEach(async (command) => {
    if (command.endsWith(".js")) {
        let cmd: Command = await import(`./command/${command.slice(0, -3)}`)
        commands[cmd.name] = cmd
    }
})

export let bot: Bot
async function setupBot() {
    bot = createBot({
        host: "play.molean.com",
        fakeHost: "play.molean.com",
        port: 25565,
        username: BOT_USERNAME,
        auth: "microsoft",
        viewDistance: BOT_VIEWDISTANCE,
        profilesFolder: "./cache",
        onMsaCode: async (data) => {
            console.log(
                `To sign in the account ${BOT_USERNAME}, use a web browser to open the page https://www.microsoft.com/link and use the code ${data.user_code} or visit http://microsoft.com/link?otc=${data.user_code}`
            )
        }
    })

    bot.on("kicked", () => {
        console.log(`Restarting bot ${BOT_USERNAME}`)
        setTimeout(setupBot, 5000)
    })

    bot.on("error", () => {
        console.log(`Restarting bot ${BOT_USERNAME}`)
        setTimeout(setupBot, 5000)
    })

    bot.on("end", (reason) => {
        console.log(`Restarting bot ${BOT_USERNAME}`)
        setTimeout(setupBot, 5000)
    })

    bot.loadPlugin(pathfinder)
    bot.loadPlugin(loadTaskPlugin)

    bot.on("chat", async (sender, rawMessage) => {
        // Checks if the sender is verified, if not then return 
        if (!verifyByUsername(sender)) return
        // Checks if the message is a whisper message, if not then return
        let whipserMessageStart = `${bot.username}: `
        if (!rawMessage.startsWith(whipserMessageStart)) return
    
        let message = rawMessage.slice(whipserMessageStart.length)
        let commandInfo = message.split(' ')
        let commandName = commandInfo[0]
        let args = commandInfo.slice(1)
        console.log(`${sender} executing command ${commandName} with args ${args}`)
        let command = commands[commandName]
        if (command === undefined) {
            bot.chat(`/w ${sender} 無法找到這個命令`)
            return
        }
        try {
            command.execute(bot, sender, args)
        } catch {}
    })
}

process.on('unhandledRejection', function(err, promise) {
    console.log(err)
    bot.end()
});

setupBot()