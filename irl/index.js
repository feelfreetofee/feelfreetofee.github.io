import {client} from './client'

import {tts, TTS} from './tts'

client.addEventListener('notification', ({data}) => {
    if (data.metadata.subscription_type !== 'channel.chat.message') return
    const {text} = data.payload.event.message
    const lowerText = text.toLowerCase().trim()
    
    if (lowerText === '!hola') {
        const broadcaster_id = client.user_id
        const username = data.payload.event.chatter_user_name || data.payload.event.chatter_user_login || 'amigo'
        client.sendMessage(broadcaster_id, `¡Hola ${username}! 👋`).catch(err => {
            console.error('Error al enviar mensaje:', err)
        })
        return
    }
    
    TTS(text)
})

import * as OAuth2 from './twitch/oauth2'

if (!client.token)
    try {
        if (client.token = OAuth2.response())
            localStorage.setItem('irl_twitch_token', client.token)
        else
            location.replace(
                OAuth2.authorize(
                    location.href,
                    client.client_id,
                    client.scopes
                )
            )
    } catch(error) {
        // TODO UI
        console.error(`${error.name} - ${error.message}`)
    }
if (client.token)
    OAuth2.validate(client)
    .then(validation => client.connect(client.user_id = validation.user_id))
    .catch(e => location.replace(
        OAuth2.authorize(
            location.href,
            client.client_id,
            client.scopes
        )
    ))

