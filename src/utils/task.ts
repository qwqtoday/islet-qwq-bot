import { Bot } from "mineflayer";
import { EventEmitter } from 'events'

type Task = () => Promise<void>
type TaskEnder = () => void
interface TaskPluginConfig {
    tasks_folder?: string
}

interface TaskPlugin {
    startInterval: (name: string, task: Task, interval: number) => void
    stop: (name: string) => void
    isRunning: (name: string) => boolean
    clearTasks: () => string[]
}

declare module "mineflayer" {
    interface Bot {
        task: TaskPlugin
    }
}
export function loadTaskPlugin(bot: Bot) {
    const tasks: Map<string, TaskEnder> = new Map() 
    const taskEvent = new EventEmitter()

    bot.task = {
        startInterval: (name, task, interval) => {
            if (tasks.has(name)) {
                throw new Error("Task is already running.")
            }

            let endTask = false
            let taskFunc = () => {
                try {
                    task()
                } catch {} finally {
                    if (endTask) {
                        tasks.delete(name)
                    } else {
                        setTimeout(taskFunc, interval)
                    }
                }
            }
            let taskEnder = () => {
                endTask = true
            }
            tasks.set(name, taskEnder)
            setTimeout(taskFunc, interval)
        },
        stop: (name) => {
            let taskEnder = tasks.get(name)
            if (taskEnder === undefined) {
                throw new Error("Task is not running.")
            }
        },
        isRunning: (name) => {
            return tasks.has(name)
        }, 
        clearTasks: () => {
            let endedTasks: string[] = []
            tasks.forEach((ender, task) => {
                ender()
                endedTasks.push(task)
            })
            return endedTasks
        }
    }
}
