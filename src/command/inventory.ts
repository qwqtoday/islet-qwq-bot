import { Command } from "../types";
import { Item } from 'prismarine-item';
import { sleep } from "../utils/sleep";
import chatQueue from "../utils/chatQueue";
import MinecraftData = require("minecraft-data");
import { countInventoryItems } from "../utils/inventory";

const mcData = MinecraftData("1.20.4")

function formatItem(item: Item): string {
    if (item === null) return "<gray>█"
    return `<yellow>█`
}
const command: Command = {
    name: "inventory",
    usage: "inventory",
    execute: async (bot, sender, args) => {
        let offhand = bot.inventory.slots[45]
        let armor = bot.inventory.slots.slice(5, 8+1)
        let container = bot.inventory.slots.slice(9, 35+1)
        let hotbar = bot.inventory.slots.slice(36, 44+1)
        let armorFormat = ""
        for (let item of armor) {
            armorFormat += formatItem(item)
        }
        let containerRows = []
        for (let i = 0; i < 3; i++) {
            let row = container.slice(i*9, i*9+9)
            let rowFormat = ""
            for (let item of row) {
                rowFormat += formatItem(item)
            }
            containerRows.push(`/w ${sender} ${rowFormat}<newline>`)
        }
        let hotbarFormat = ""
        for (let item of hotbar) {
            hotbarFormat += formatItem(item)
        }
        let itemCount = countInventoryItems()

        let itemCountRows = []
        for (let itemName in itemCount) {
            itemCountRows.push(
                `/w ${sender} <blue>${itemName}: <yellow>${itemCount[itemName]}<newline>`
            )
        }
        chatQueue([
            `/w transaction ${sender}`,
            `/w ${sender} <green>盔甲: ${armorFormat} <green>副手: ${formatItem(offhand)}<newline>`,
            `/w ${sender} <green>背包:<newline>`,
            ...containerRows,
            `/w ${sender} <green>快速欄:<newline>${hotbarFormat}<newline>`,
            `/w ${sender} <green>物品數量:<newline>`,
            ...itemCountRows,
            `/w commit ${sender}`
        ])
    }
}

export default command