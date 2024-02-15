"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyByUsername = void 0;
var config_1 = require("../config");
function verifyByUsername(username) {
    var config = (0, config_1.getConfig)();
    return config.allowed_users.includes(username);
}
exports.verifyByUsername = verifyByUsername;
