"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotInstanceConfig = exports.getConfig = void 0;
var fs = require("fs");
var config_cache;
function getConfig() {
    if (config_cache !== undefined) {
        return config_cache;
    }
    var buffer = fs.readFileSync("./config.json");
    var content = buffer.toString();
    var config = JSON.parse(content);
    config_cache = config;
    return config;
}
exports.getConfig = getConfig;
function getBotInstanceConfig(id) {
    var config = getConfig();
    return config.bot_instances[id];
}
exports.getBotInstanceConfig = getBotInstanceConfig;
