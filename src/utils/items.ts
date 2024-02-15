import MinecraftData = require("minecraft-data")

const mcData = MinecraftData("1.20.2")

export function getItem(name: string): MinecraftData.Item {
    let item = mcData.itemsArray.find((item) => item.name.toLowerCase() == name.toLowerCase())
    return item
}

export function getItemRecipes(name: string) {
    let item = getItem(name)
    let recipes = mcData.recipes[item.id]
    for (let recipe of recipes) {
        recipe
    }
}