import { bot } from "../bot";

export function countInventoryItems(): {[item_name: string]: number}{
    let itemCount: {[item_name: string]: number} = {}
    for (let item of bot.inventory.slots) {
        if (item === null) continue
        let count = itemCount[item.name]
        if (count === undefined) count = 0
        count += item.count
        itemCount[item.name] = count
    }
    return itemCount
}