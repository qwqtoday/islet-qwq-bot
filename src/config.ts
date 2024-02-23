import * as fs from 'fs';

export interface BotInstanceConfig {
    username: string
    max_retries: number | boolean
    view_distance: number
}

export interface Config {
    allowed_users: string[]
    panel_port: number
    bot_instances: BotInstanceConfig[]
}

let config_cache: Config

export function getConfig(): Config {
    if (config_cache !== undefined) {
        return config_cache
    }
    let buffer = fs.readFileSync("./config.json")
    let content = buffer.toString()
    let config: Config = JSON.parse(content)
    config_cache = config
    return config
}

export function getBotInstanceConfig(id: number): BotInstanceConfig {
    let config = getConfig()
    return config.bot_instances[id]
}
