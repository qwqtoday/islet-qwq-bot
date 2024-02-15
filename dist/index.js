"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = require("./config");
var child_process = require("child_process");
var express = require("express");
var config = Config.getConfig();
var botInstances = [];
botInstances.length = config.bot_instances.length;
function startInstance(id) {
    var args = ["".concat(id)];
    var child = child_process.fork("./dist/bot.js", args);
    botInstances[id] = child;
}
for (var i in config.bot_instances) {
    var id = parseInt(i);
    startInstance(id);
}
var app = express();
app.set('view engine', 'pug');
app.get("/", function (req, res) {
    res.render("index", { instances: config.bot_instances });
});
app.post("/start/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var instance = botInstances[id];
    if (instance === undefined || instance === null) {
        startInstance(id);
        res.send("OK");
    }
    else {
        res.send("ALREADY STARTED");
    }
});
app.post("/stop/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var instance = botInstances[id];
    if (instance === undefined || instance === null) {
        res.send("ALREADY STOPPED");
    }
    else {
        instance.kill();
        botInstances[id] = undefined;
        res.send("OK");
    }
});
app.listen(3000);
