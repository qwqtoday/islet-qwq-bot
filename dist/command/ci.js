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
var chatQueue_1 = require("../utils/chatQueue");
var items_1 = require("../utils/items");
var inventory_1 = require("../utils/inventory");
var bot_1 = require("../bot");
var ciAutoPut = function () {
    try {
        if (autoPutRunning) {
            var itemsCount = (0, inventory_1.countInventoryItems)();
            var doPut = false;
            for (var itemName in itemsCount) {
                if (autoPutItems.includes(itemName)) {
                    doPut = true;
                }
            }
            if (doPut) {
                (0, chatQueue_1.default)([
                    "/ci put"
                ]);
                var listener_1 = function (window) { return __awaiter(void 0, void 0, void 0, function () {
                    var items, _i, items_2, item, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 5, 6, 7]);
                                items = bot_1.bot.inventory.items();
                                items = items.filter(function (item, index, arr) {
                                    return arr.findIndex(function (i) { return i.name == item.name; }) === index;
                                });
                                _i = 0, items_2 = items;
                                _a.label = 1;
                            case 1:
                                if (!(_i < items_2.length)) return [3 /*break*/, 4];
                                item = items_2[_i];
                                if (!autoPutItems.includes(item.name)) return [3 /*break*/, 3];
                                return [4 /*yield*/, bot_1.bot.transfer({
                                        window: window,
                                        itemType: item.type,
                                        metadata: null,
                                        count: 3456,
                                        sourceStart: 54,
                                        sourceEnd: 89,
                                        destStart: 0,
                                        destEnd: 53
                                    })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [3 /*break*/, 7];
                            case 5:
                                e_1 = _a.sent();
                                console.log(e_1);
                                return [3 /*break*/, 7];
                            case 6:
                                bot_1.bot.closeWindow(window);
                                bot_1.bot.removeListener("windowOpen", listener_1);
                                return [7 /*endfinally*/];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); };
                bot_1.bot.addListener("windowOpen", listener_1);
            }
        }
    }
    catch (_a) { }
    finally {
        setTimeout(ciAutoPut, 5000);
    }
};
var autoPutItems = [];
var autoPutRunning = false;
setTimeout(ciAutoPut, 5000);
var command = {
    name: "ci",
    usage: "<green>Usage:<newline><yellow>ci get <物品> <數量>",
    execute: function (bot, sender, args) {
        var subCommand = args[0];
        if (subCommand == "get") {
            var itemName = args[1];
            var quantity = parseInt(args[2]);
            var item = (0, items_1.getItem)(itemName);
            if (item === undefined) {
                (0, chatQueue_1.default)([
                    "/w ".concat(sender, " <red>\u9019\u500B\u7269\u54C1\u4E0D\u5B58\u5728")
                ]);
                return;
            }
            (0, chatQueue_1.default)([
                "/ci get ".concat(item.name, " ").concat(quantity),
                "/w ".concat(sender, " <aqua>\u5DF2\u5617\u8A66\u53D6\u51FA").concat(quantity, "\u500B").concat(item.name)
            ]);
        }
        else if (subCommand == "put") {
            var itemName = args[1];
            var quantity_1 = parseInt(args[2]);
            var item_1 = (0, items_1.getItem)(itemName);
            if (item_1 === undefined) {
                (0, chatQueue_1.default)([
                    "/w ".concat(sender, " <red>\u9019\u500B\u7269\u54C1\u4E0D\u5B58\u5728")
                ]);
                return;
            }
            var itemsCount = (0, inventory_1.countInventoryItems)();
            var count = itemsCount[item_1.name];
            if (count === undefined) {
                (0, chatQueue_1.default)([
                    "/w ".concat(sender, " <red>\u80CC\u5305\u5167\u4E0D\u5B58\u5728\u9019\u500B\u7269\u54C1")
                ]);
                return;
            }
            else if (quantity_1 > count) {
                (0, chatQueue_1.default)([
                    "/w ".concat(sender, " <red>\u6578\u91CF\u9AD8\u65BC\u80CC\u5305\u5167\u7269\u54C1\u7684\u6578\u91CF")
                ]);
                return;
            }
            (0, chatQueue_1.default)([
                "/ci put"
            ]);
            var listener_2 = function (window) { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, 4, 5]);
                            if (!(window.title == "{\"text\":\"\u4E0A\u4F20\u7269\u54C1\"}")) return [3 /*break*/, 2];
                            return [4 /*yield*/, bot.transfer({
                                    window: window,
                                    itemType: item_1.id,
                                    metadata: null,
                                    count: quantity_1,
                                    sourceStart: 54,
                                    sourceEnd: 89,
                                    destStart: 0,
                                    destEnd: 53
                                })];
                        case 1:
                            _b.sent();
                            bot.closeWindow(window);
                            (0, chatQueue_1.default)([
                                "/w ".concat(sender, " \u6210\u529F\u5C07").concat(quantity_1, "\u500B").concat(item_1.name, "\u4E0A\u50B3\u5230\u96F2\u5009")
                            ]);
                            _b.label = 2;
                        case 2: return [3 /*break*/, 5];
                        case 3:
                            _a = _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            bot.removeListener("windowOpen", listener_2);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            }); };
            bot.addListener("windowOpen", listener_2);
        }
        else if (subCommand == "autoput") {
            if (args[1] === "stop") {
                autoPutRunning = false;
                return;
            }
            var items = args.slice(1);
            autoPutRunning = true;
            autoPutItems = items;
        }
    }
};
exports.default = command;
