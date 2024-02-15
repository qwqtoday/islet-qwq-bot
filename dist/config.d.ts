export interface BotInstanceConfig {
    username: string;
    max_retries: number | boolean;
    view_distance: number;
}
export interface Config {
    allowed_users: string[];
    bot_instances: BotInstanceConfig[];
}
export declare function getConfig(): Config;
export declare function getBotInstanceConfig(id: number): BotInstanceConfig;
