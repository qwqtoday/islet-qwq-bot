"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("../bot");
var chatQueue_1 = require("../utils/chatQueue");
var items_1 = require("../utils/items");
var autoCraftItems = [];
var autoCraftCraftingTable;
var autoCraftRunning = false;
var autoCraft = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, autoCraftItems_1, itemName, item, recipes, recipe, _a, _b, _c, item, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 11, 12, 13]);
                if (!autoCraftRunning)
                    throw new Error("auto craft running.");
                _i = 0, autoCraftItems_1 = autoCraftItems;
                _e.label = 1;
            case 1:
                if (!(_i < autoCraftItems_1.length)) return [3 /*break*/, 6];
                itemName = autoCraftItems_1[_i];
                item = (0, items_1.getItem)(itemName);
                recipes = bot_1.bot.recipesFor(item.id, null, null, autoCraftCraftingTable);
                recipe = recipes.at(0);
                if (recipe === undefined)
                    return [3 /*break*/, 5];
                _e.label = 2;
            case 2:
                _e.trys.push([2, 4, , 5]);
                return [4 /*yield*/, bot_1.bot.craft(recipe, 1728, autoCraftCraftingTable)];
            case 3:
                _e.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = _e.sent();
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                _b = 0, _c = bot_1.bot.inventory.items();
                _e.label = 7;
            case 7:
                if (!(_b < _c.length)) return [3 /*break*/, 10];
                item = _c[_b];
                if (!autoCraftItems.includes(item.name)) return [3 /*break*/, 9];
                return [4 /*yield*/, bot_1.bot.tossStack(item)];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9:
                _b++;
                return [3 /*break*/, 7];
            case 10: return [3 /*break*/, 13];
            case 11:
                _d = _e.sent();
                return [3 /*break*/, 13];
            case 12:
                setTimeout(autoCraft, 5000);
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}); };
setTimeout(autoCraft, 5000);
var command = {
    name: "craft",
    usage: "Usage: craft",
    execute: function (bot, sender, args) { return __awaiter(void 0, void 0, void 0, function () {
        var craftingTable, items, _a, itemName, count, afterCraft, item, recipes, recipe, e_1, _i, _b, inventoryItem;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    craftingTable = bot.findBlock({
                        matching: function (block) { return block.name == "crafting_table"; },
                        maxDistance: 3
                    });
                    if (craftingTable === null) {
                        (0, chatQueue_1.default)(["/w ".concat(sender, " There are no crafting tables near you.")]);
                        return [2 /*return*/];
                    }
                    if (args[0] === "auto") {
                        autoCraftCraftingTable = craftingTable;
                        autoCraftRunning = true;
                        items = args.slice(1);
                        autoCraftItems = items;
                        return [2 /*return*/];
                    }
                    else if (args[0] === "stop") {
                        autoCraftRunning = false;
                        return [2 /*return*/];
                    }
                    _a = args[0].split(":"), itemName = _a[0], count = _a[1], afterCraft = _a[2];
                    item = (0, items_1.getItem)(itemName);
                    recipes = bot.recipesFor(item.id, null, null, craftingTable);
                    if (recipes.length == 0) {
                        return [2 /*return*/];
                    }
                    recipe = recipes.at(0);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bot.craft(recipe, parseInt(count), craftingTable)];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    console.log(e_1);
                    return [2 /*return*/];
                case 4:
                    if (!(afterCraft == "drop")) return [3 /*break*/, 8];
                    _i = 0, _b = bot.inventory.items();
                    _c.label = 5;
                case 5:
                    if (!(_i < _b.length)) return [3 /*break*/, 8];
                    inventoryItem = _b[_i];
                    if (!(inventoryItem.type == item.id)) return [3 /*break*/, 7];
                    return [4 /*yield*/, bot.tossStack(inventoryItem)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    }); }
};
exports.default = command;
