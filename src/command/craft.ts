import { bot } from "../bot";
import { Command } from "../types";
import { countInventoryItems } from "../utils/inventory";
import { getItem } from "../utils/items";
import { Recipe } from "prismarine-recipe"

let autoCraftItems: string[] = []
let autoCraftCraftingTable
let autoCraftRunning: boolean = false
const autoCraft = async () => {
    try {
        if (!autoCraftRunning) throw new Error("auto craft running.")
        for (let itemName of autoCraftItems) {
            let item = getItem(itemName)
            let recipes = bot.recipesFor(item.id, null, null, autoCraftCraftingTable)
            let recipe = recipes.find((recipe) => recipe.result.id == item.id)
            if (recipe === undefined) continue
            try {
                await bot.craft(recipe, 1728, autoCraftCraftingTable)
            } catch {}
        }
        for (let item of bot.inventory.items()) {
            if (autoCraftItems.includes(item.name)) {
                await bot.tossStack(item)
            }
        }
    } catch {} finally {
        setTimeout(autoCraft, 1500)
    }
}

setTimeout(autoCraft, 1500)
const command: Command = {
    name: "craft",
    usage: "Usage: craft",
    execute: async (bot, sender, args) => {
        let craftingTable = bot.findBlock({
            matching: (block) => block.name == "crafting_table",
            maxDistance: 3
        })
        if (craftingTable === null) {
            bot.chat(`/w ${sender} There are no crafting tables near you.`)
            return
        }
        if (args[0] === "auto") {
            autoCraftCraftingTable = craftingTable
            autoCraftRunning = true
            let items = args.slice(1)
            autoCraftItems = items
            return
        } else if (args[0] === "stop") {
            autoCraftRunning = false
            return
        }
        let [itemName, count, afterCraft] = args[0].split(":")
        let item = getItem(itemName)
        let recipes = bot.recipesFor(item.id, null, null, craftingTable)
        if (recipes.length == 0) {
            return
        }
        let recipe = recipes.at(0)
        try {
            await bot.craft(recipe, parseInt(count), craftingTable)
        } catch (e) {
            console.log(e)
            return
        }
        if (afterCraft == "drop") {
            for (let inventoryItem of bot.inventory.items()) {
                if (inventoryItem.type == item.id) {
                    await bot.tossStack(inventoryItem)
                }
            }
        }
    }
}

export = command