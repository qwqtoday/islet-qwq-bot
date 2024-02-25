import { Bot, Chest } from "mineflayer";
import { Window } from "prismarine-windows";
import { once } from 'events';


export function ciPutTaskGenerator(bot: Bot, itemIds: number[]) {
    return async () => {
        let inventoryExistItemIds = []
        itemIds.forEach((id) => {
            if (bot.inventory.findInventoryItem(id, null, false)) inventoryExistItemIds.push(id)
        })
        if (inventoryExistItemIds.length == 0) return

        bot.chat(`/ci put`)
        let eventArgs = await once(bot, "windowOpen")
        let window: Window<Chest> = eventArgs[0]

        for (let id of inventoryExistItemIds) {
            try {
                await bot.transfer({
                    window: window,
                    itemType: id,
                    metadata: null,
                    count: 3456,
                    sourceStart: 54,
                    sourceEnd: 89,
                    destStart: 0,
                    destEnd: 53
                })
            } catch {}
        }
    }
}