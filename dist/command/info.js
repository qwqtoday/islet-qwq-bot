"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chatQueue_1 = require("../utils/chatQueue");
var command = {
    name: "info",
    usage: "command",
    execute: function (bot, sender, args) {
        (0, chatQueue_1.default)([
            "/w ".concat(sender, " bot version: ").concat(bot.version)
        ]);
    }
};
exports.default = command;
