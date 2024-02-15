import { Command } from "../types";
import chatQueue from "../utils/chatQueue";
import { getItem } from "../utils/items";
import { countInventoryItems } from "../utils/inventory";
import { Window } from 'prismarine-windows'
import { Chest } from "mineflayer";
import { bot } from "../bot";


const ciAutoPut = () => {
    try {
        if (autoPutRunning) {
            let itemsCount = countInventoryItems()
            let doPut = false
            for (let itemName in itemsCount) {
                if (autoPutItems.includes(itemName)) {
                    doPut = true
                }
            }
            if (doPut) {
                chatQueue([
                    `/ci put`
                ])
                const listener = async (window: Window<Chest>) => {
                    try {
                        let items = bot.inventory.items()
                        items = items.filter((item, index, arr) => 
                            arr.findIndex((i) => i.name == item.name) === index
                        )
                        for (let item of items) {
                            if (autoPutItems.includes(item.name)) {
                                await bot.transfer({
                                    window: window,
                                    itemType: item.type,
                                    metadata: null, 
                                    count: 3456,
                                    sourceStart: 54,
                                    sourceEnd: 89,
                                    destStart: 0,
                                    destEnd: 53
                                })
                            }
                        }
                    } catch (e){
                        console.log(e)
                    } finally {
                        bot.closeWindow(window)
                        bot.removeListener("windowOpen", listener)
                    }
                }
                bot.addListener("windowOpen", listener)
            }
        }
    } catch {} finally {
        setTimeout(ciAutoPut, 5000)
    }
}
let autoPutItems: string[] = []

let autoPutRunning = false
setTimeout(ciAutoPut, 5000)


const command: Command = {
    name: "ci",
    usage: "<green>Usage:<newline><yellow>ci get <物品> <數量>",
    execute: (bot, sender, args) => {
        let subCommand = args[0]
        if (subCommand == "get"){
            let itemName = args[1]
            let quantity = parseInt(args[2])
            let item = getItem(itemName)
            if (item === undefined) {
                chatQueue([
                    `/w ${sender} <red>這個物品不存在`
                ])
                return
            }
            chatQueue([
                `/ci get ${item.name} ${quantity}`,
                `/w ${sender} <aqua>已嘗試取出${quantity}個${item.name}`
            ])
        } else if (subCommand == "put") {
            let itemName = args[1]
            let quantity = parseInt(args[2])
            let item = getItem(itemName) 
            if (item === undefined){
                chatQueue([
                    `/w ${sender} <red>這個物品不存在`
                ])
                return
            }
            let itemsCount = countInventoryItems()
            let count = itemsCount[item.name]
            if (count === undefined) {
                chatQueue([
                    `/w ${sender} <red>背包內不存在這個物品`
                ])
                return
            } else if (quantity > count) {
                chatQueue([
                    `/w ${sender} <red>數量高於背包內物品的數量`
                ])
                return
            }
            chatQueue([
                `/ci put`
            ])

            let listener = async (window: Window<Chest>) => {
                try {
                    if (window.title == `{"text":"上传物品"}`) {
                        await bot.transfer({
                            window: window,
                            itemType: item.id,
                            metadata: null, 
                            count: quantity,
                            sourceStart: 54,
                            sourceEnd: 89,
                            destStart: 0,
                            destEnd: 53
                        })
                        bot.closeWindow(window)
                        chatQueue([
                            `/w ${sender} 成功將${quantity}個${item.name}上傳到雲倉`
                        ])
                    }
                } catch {} finally {
                        bot.removeListener("windowOpen", listener)
                }
            }
            bot.addListener("windowOpen", listener)
        } else if (subCommand == "autoput") {
            if (args[1] === "stop") {
                autoPutRunning = false
                return
            }
            let items = args.slice(1)
            autoPutRunning = true
            autoPutItems = items
        }
    }
}


export default command