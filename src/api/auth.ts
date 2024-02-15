import { getConfig } from "../config";

export function verifyByUsername(username: string): boolean {
    let config = getConfig()
    return config.allowed_users.includes(username)
}