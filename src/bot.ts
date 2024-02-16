import { verifyByUsername } from './api/auth';
import * as Config from './config';
import * as fs from 'fs';
import { Bot, createBot } from "mineflayer";
import { pathfinder, Movements } from 'mineflayer-pathfinder'
import { Command } from './types';
import chatQueue from './utils/chatQueue';
import MinecraftData = require('minecraft-data');


const args = process.argv.slice(2)
const instanceId = parseInt(args[0])
const instanceConfig = Config.getBotInstanceConfig(instanceId)

export let bot: Bot

let commands: { [name: string]: Command } = {}
fs.readdirSync("./dist/command/").forEach(async (command) => {
    if (command.endsWith(".js")) {
        let cmd: Command = (await import(`./command/${command.slice(0, -3)}`)).default
        commands[cmd.name] = cmd
    }
})

async function setupBot() {
    bot = createBot({
        host: "play.molean.com",
        fakeHost: "play.molean.com",
        port: 25565,
        username: `${instanceConfig.username}`,
        auth: "microsoft",
        viewDistance: instanceConfig.view_distance,
        profilesFolder: "./cache",
        onMsaCode: (data) => {
            console.log(
                `To sign in the account ${instanceConfig.username}, use a web browser to open the page https://www.microsoft.com/link and use the code ${data.user_code} or visit http://microsoft.com/link?otc=${data.user_code}`
            )
        }
    })
    bot.registry = MinecraftData("1.20.2")
    bot.loadPlugin(pathfinder)
    
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
            chatQueue([
                `/w ${sender} 無法找到這個命令`
            ])
            return
        }
        try {
            command.execute(bot, sender, args)
        } catch (e) {}
    })
    
    bot.on("end", async (reason) => {
        await setupBot()
    })
}
setupBot()