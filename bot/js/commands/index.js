import {default as help} from './help'
import {default as ping} from './ping'
import {play, pause, skip} from './music'

export const prefix = '!' 

export const commands = {
    help,
    ping,
    play,
    pause,
    skip
}

/**
 * @param {string} text
 */
export function executeCommand(client, event) {
    const [command, ...args] = event.message.text.slice(1).split(' ')
    return commands[command]?.(client, event, ...args)
}