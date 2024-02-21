import { Command } from "../types";

const command: Command = {
    name: "hold", 
    usage: "hold",
    execute: async (bot, sender, args) => {
        let [itemName] = args
        let itemType = bot.registry
        let itemData = itemType.itemsByName[itemName]
        if (itemData === null || itemData === undefined) {
            bot.chat(`/w ${sender} <red>這個物品不存在`)
            return
        }
        let item = bot.inventory.findInventoryItem(itemData.id, null, false)
        if (item === null || item === undefined) {
            bot.chat(`/w ${sender} <red>背包內不存在這個物品`)
            return
        }
        await bot.equip(item, 'hand')
    }
}

export = command