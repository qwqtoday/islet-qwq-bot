"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countInventoryItems = void 0;
var bot_1 = require("../bot");
function countInventoryItems() {
    var itemCount = {};
    for (var _i = 0, _a = bot_1.bot.inventory.slots; _i < _a.length; _i++) {
        var item = _a[_i];
        if (item === null)
            continue;
        var count = itemCount[item.name];
        if (count === undefined)
            count = 0;
        count += item.count;
        itemCount[item.name] = count;
    }
    return itemCount;
}
exports.countInventoryItems = countInventoryItems;
