import {client} from './twitch'
import playTTS from './tts'
import {prefix, executeCommand} from './commands'

client.addEventListener('notification', ({
    data: {
        metadata: {subscription_type},
        payload: {event}
    }
}) => {
    if (subscription_type !== 'channel.chat.message') return
    const {message: {text}} = event
    if (text.startsWith(prefix))
        executeCommand(client, event)
    else
        playTTS(event)
})
