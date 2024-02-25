import * as Config from './config';
import * as child_process from 'child_process'
import fs = require("fs")
import express = require("express")

if (!fs.existsSync("./cache")) {
    fs.mkdirSync("./cache")
}

Config.loadConfig()

let botInstances: child_process.ChildProcess[] = []
botInstances.length = Config.config.bot_instances.length

function startInstance(id: number) {
    let args = [ `${id}` ]
    let child = child_process.fork("./dist/bot.js", args)
    botInstances[id] = child
}
for (let i in Config.config.bot_instances) {
    let id = parseInt(i)
    startInstance(id)
}

const app = express()
app.set('view engine', 'pug')

app.get("/", (req, res) => {
    res.render("index", {instances: Config.config.bot_instances})
})
app.post("/start/:id", (req, res) => {
    let id = parseInt(req.params.id)
    let instance = botInstances[id]
    if (instance === undefined || instance === null) {
        startInstance(id)
        res.send("OK")
    } else {
        res.send("ALREADY STARTED")
    }
})

app.post("/stop/:id", (req, res) => {
    let id = parseInt(req.params.id)
    let instance = botInstances[id]
    if (instance === undefined || instance === null) {
        res.send("ALREADY STOPPED")
    } else {
        instance.kill()
        botInstances[id] = undefined
        res.send("OK")
    }
})

app.listen(Config.config.panel_port)