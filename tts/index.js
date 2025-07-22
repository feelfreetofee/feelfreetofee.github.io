import {client} from './client'

import {tts, TTS} from './tts'

const languageDetector = await LanguageDetector.create({
    expectedInputLanguages: ['en-US', 'es-ES'],
})

function detectLanguage(text) {
    return languageDetector.detect(text)
        .then(r => r.find(({detectedLanguage}) =>
            languageDetector.expectedInputLanguages.includes(detectedLanguage)))
}

client.addEventListener('notification', ({data}) => {
    if (data.metadata.subscription_type !== 'channel.chat.message') return
    const {text} = data.payload.event.message
    detectLanguage(text).then(r => TTS(text, r?.detectedLanguage))
})

import * as OAuth2 from './twitch/oauth2'

if (!client.token)
    try {
        if (client.token = OAuth2.response())
            localStorage.setItem('tts_twitch_token', client.token)
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
