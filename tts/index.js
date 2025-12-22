import {client} from './client'
import {tts, TTS} from './tts'

const languageDetector = await LanguageDetector.create({
    expectedInputLanguages: ['en-US', 'es-ES'],
})

const pedroAudio = new Audio('https://www.myinstants.com/media/sounds/pedro-song.mp3')
pedroAudio.volume = 0.8

const trololoAudio = new Audio('https://www.myinstants.com/media/sounds/trollolol.swf.mp3')
trololoAudio.volume = 0.8

let isPlayingSong = false

function detectLanguage(text) {
    return languageDetector.detect(text)
        .then(r => r.find(({detectedLanguage}) =>
            languageDetector.expectedInputLanguages.includes(detectedLanguage)))
}

function playSong(audio, duration = 15000) {
    if (isPlayingSong) return
    
    isPlayingSong = true
    audio.currentTime = 0
    audio.play()
    
    setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
        isPlayingSong = false
    }, duration)
}

function processMessageText(text) {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('pedro')) {
        playSong(pedroAudio)
        return null
    }
    
    if (lowerText.includes('trololo')) {
        playSong(trololoAudio)
        return null
    }
    
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|net|org|io|tv|gg|xyz|me|co)[^\s]*)/gi
    return text.replace(urlRegex, 'LINK')
}

client.addEventListener('notification', ({data}) => {
    if (data.metadata.subscription_type !== 'channel.chat.message') return
    const {text} = data.payload.event.message
    
    const processedText = processMessageText(text)
    
    if (processedText) {
        detectLanguage(processedText).then(r => TTS(processedText, r?.detectedLanguage))
    }
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
