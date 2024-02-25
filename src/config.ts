import * as fs from 'fs';

export interface BotInstanceConfig {
    username: string
    max_retries: number | boolean
    view_distance: number
    defaultAutoCIPut: string[]
}

export interface Config {
    allowed_users: string[]
    panel_port: number
    bot_instances: BotInstanceConfig[]
}

export let config: Config

export function loadConfig() {
    let buffer = fs.readFileSync("./config.json")
    let content = buffer.toString()
    config = JSON.parse(content)
}

export function getBotInstanceConfig(id: number): BotInstanceConfig {
    return config.bot_instances[id]
}
