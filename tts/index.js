import {client} from './client'
import {tts, TTS} from './tts'

const languageDetector = await LanguageDetector.create({
    expectedInputLanguages: ['en-US', 'es-ES'],
})

const songs = {
    pedro: new Audio('https://www.myinstants.com/media/sounds/pedro-song.mp3'),
    trololo: new Audio('https://www.myinstants.com/media/sounds/trollolol.swf.mp3')
}

let songTimeout

function detectLanguage(text) {
    return languageDetector.detect(text)
        .then(r => r.find(({detectedLanguage}) =>
            languageDetector.expectedInputLanguages.includes(detectedLanguage)))
}

function playSong(audio, duration = 15000) {
    if (songTimeout) return

    audio.volume = 0.4
    audio.currentTime = 0
    audio.play()
    
    songTimeout = setTimeout(() => {
        audio.pause()
        songTimeout = undefined
    }, duration)
}

function processMessageText(text) {
    const lowerText = text.toLowerCase()

    for (const song in songs)
        if (lowerText === song) {
            playSong(songs[song])
            return null
        }

    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|net|org|io|tv|gg|xyz|me|co)[^\s]*)/gi
    return text.replace(urlRegex, 'LINK')
}

client.addEventListener('notification', ({data}) => {
    if (data.metadata.subscription_type !== 'channel.chat.message') return
    const {text} = data.payload.event.message
    
    const processedText = processMessageText(text)
    
    if (processedText)
        detectLanguage(processedText).then(r => TTS(processedText, r?.detectedLanguage))
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

