import { config } from "../config";

export function verifyByUsername(username: string): boolean {
    return config.allowed_users.includes(username)
}