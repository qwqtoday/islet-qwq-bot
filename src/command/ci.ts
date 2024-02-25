import { ciPutTaskGenerator } from "../tasks/ciAutoPut";
import { Command } from "../types";


const command: Command = {
    name: "ci",
    usage: "<green>Usage:<newline><yellow>ci get <物品> <數量>",
    execute: (bot, sender, args) => {
        let action = args[0]
        let items = args.slice(1)

        if (action == "put") {
            let itemIds = []
            for (let itemName of items) {
                let item = bot.registry.itemsByName[itemName]
                if (item === null || item === undefined) {
                    bot.chat(`/w ${sender} ${itemName} does not exist`)
                    return
                }
                itemIds.push(item.id)
            }
            let putTask = ciPutTaskGenerator(bot, itemIds)
            putTask()
        }
        else if (action == "interval-put") {
            let itemIds = []
            for (let itemName of items) {
                let item = bot.registry.itemsByName[itemName]
                if (item === null || item === undefined) {
                    bot.chat(`/w ${sender} ${itemName} does not exist`)
                    return
                }
                itemIds.push(item.id)
            }
            let putTask = ciPutTaskGenerator(bot, itemIds)
            bot.task.startInterval("ciPutTask", putTask, 1500)
        }
        else if (action == "interval-get") {}
    }
}


export = command