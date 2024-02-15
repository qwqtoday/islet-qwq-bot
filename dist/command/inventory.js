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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var chatQueue_1 = require("../utils/chatQueue");
var MinecraftData = require("minecraft-data");
var inventory_1 = require("../utils/inventory");
var mcData = MinecraftData("1.20.4");
function formatItem(item) {
    if (item === null)
        return "<gray>█";
    return "<yellow>\u2588";
}
var command = {
    name: "inventory",
    usage: "inventory",
    execute: function (bot, sender, args) { return __awaiter(void 0, void 0, void 0, function () {
        var offhand, armor, container, hotbar, armorFormat, _i, armor_1, item, containerRows, i, row, rowFormat, _a, row_1, item, hotbarFormat, _b, hotbar_1, item, itemCount, itemCountRows, itemName;
        return __generator(this, function (_c) {
            offhand = bot.inventory.slots[45];
            armor = bot.inventory.slots.slice(5, 8 + 1);
            container = bot.inventory.slots.slice(9, 35 + 1);
            hotbar = bot.inventory.slots.slice(36, 44 + 1);
            armorFormat = "";
            for (_i = 0, armor_1 = armor; _i < armor_1.length; _i++) {
                item = armor_1[_i];
                armorFormat += formatItem(item);
            }
            containerRows = [];
            for (i = 0; i < 3; i++) {
                row = container.slice(i * 9, i * 9 + 9);
                rowFormat = "";
                for (_a = 0, row_1 = row; _a < row_1.length; _a++) {
                    item = row_1[_a];
                    rowFormat += formatItem(item);
                }
                containerRows.push("/w ".concat(sender, " ").concat(rowFormat, "<newline>"));
            }
            hotbarFormat = "";
            for (_b = 0, hotbar_1 = hotbar; _b < hotbar_1.length; _b++) {
                item = hotbar_1[_b];
                hotbarFormat += formatItem(item);
            }
            itemCount = (0, inventory_1.countInventoryItems)();
            itemCountRows = [];
            for (itemName in itemCount) {
                itemCountRows.push("/w ".concat(sender, " <blue>").concat(itemName, ": <yellow>").concat(itemCount[itemName], "<newline>"));
            }
            (0, chatQueue_1.default)(__spreadArray(__spreadArray(__spreadArray(__spreadArray([
                "/w transaction ".concat(sender),
                "/w ".concat(sender, " <green>\u76D4\u7532: ").concat(armorFormat, " <green>\u526F\u624B: ").concat(formatItem(offhand), "<newline>"),
                "/w ".concat(sender, " <green>\u80CC\u5305:<newline>")
            ], containerRows, true), [
                "/w ".concat(sender, " <green>\u5FEB\u901F\u6B04:<newline>").concat(hotbarFormat, "<newline>"),
                "/w ".concat(sender, " <green>\u7269\u54C1\u6578\u91CF:<newline>")
            ], false), itemCountRows, true), [
                "/w commit ".concat(sender)
            ], false));
            return [2 /*return*/];
        });
    }); }
};
exports.default = command;
