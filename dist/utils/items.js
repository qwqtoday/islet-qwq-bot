"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemRecipes = exports.getItem = void 0;
var MinecraftData = require("minecraft-data");
var mcData = MinecraftData("1.20.2");
function getItem(name) {
    var item = mcData.itemsArray.find(function (item) { return item.name.toLowerCase() == name.toLowerCase(); });
    return item;
}
exports.getItem = getItem;
function getItemRecipes(name) {
    var item = getItem(name);
    var recipes = mcData.recipes[item.id];
    for (var _i = 0, recipes_1 = recipes; _i < recipes_1.length; _i++) {
        var recipe = recipes_1[_i];
        recipe;
    }
}
exports.getItemRecipes = getItemRecipes;
