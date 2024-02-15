import { bot } from '../bot'
import { sleep } from './sleep'

const queuingChatMesssages: string[][] = []

export default function chatQueue(messages: string[]) {
    queuingChatMesssages.push(messages)
}

async function processChatMessages() {
    try {
        let messages = queuingChatMesssages.shift()
        if (messages === undefined) return
        for (let message of messages) {
            console.log(message)
            bot.chat(message)
            await sleep(300)
        }
    } catch (e){}
    finally {
        setTimeout(processChatMessages)
    }
}

setTimeout(processChatMessages)