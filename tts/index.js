import {client} from './client'
import {tts, TTS} from './tts'
const languageDetector = await LanguageDetector.create({
    expectedInputLanguages: ['en-US', 'es-ES'],
})
const songs = {
    pedro: new Audio('https://www.myinstants.com/media/sounds/pedro-song.mp3'),
    trololo: new Audio('https://www.myinstants.com/media/sounds/trollolol.swf.mp3'),
    pito: new Audio('https://www.myinstants.com/media/sounds/ay-ay-necesito-pito.mp3'),
    yeet: new Audio('https://www.myinstants.com/media/sounds/yeet-sound-effect.mp3'),
}
const activeSongs = new Map()
let currentVolume = parseFloat(localStorage.getItem('tts_volume')) ?? 0.4

function detectLanguage(text) {
    return languageDetector.detect(text)
        .then(r => r.find(({detectedLanguage}) =>
            languageDetector.expectedInputLanguages.includes(detectedLanguage)))
}
function playSong(audio, duration = 15000) {
    if (activeSongs.has(audio)) return
    
    audio.volume = currentVolume
    audio.currentTime = 0
    audio.play()
    
    const timeout = setTimeout(() => {
        audio.pause()
        activeSongs.delete(audio)
    }, duration)
    
    activeSongs.set(audio, timeout)
}

function stopAllAudio() {
    activeSongs.forEach((timeout, audio) => {
        clearTimeout(timeout)
        audio.pause()
        activeSongs.delete(audio)
    })
}

function setVolume(volume) {
    const vol = Math.max(0, Math.min(100, volume)) / 100
    currentVolume = vol
    activeSongs.forEach((timeout, audio) => {
        audio.volume = vol
    })
    localStorage.setItem('tts_volume', currentVolume.toString())
}
function processMessageText(text) {
    const lowerText = text.toLowerCase().trim()
    
    if (lowerText === '!skip') {
        stopAllAudio()
        return null
    }
    
    const volumeMatch = lowerText.match(/^!volume\s+(\d+)$/)
    if (volumeMatch) {
        setVolume(parseInt(volumeMatch[1]))
        return null
    }
    
    const playMatch = text.match(/^!play\s+(.+)$/i)
    if (playMatch) {
        let url = playMatch[1].trim()
        
        if (url.startsWith('/media/sounds/')) {
            url = 'https://www.myinstants.com' + url
        }
        
        if (url.includes('www.myinstants.com') || url.includes('myinstants.com')) {
            try {
                const audio = new Audio(url)
                audio.addEventListener('error', () => {
                    console.error('Error al cargar audio desde URL:', url)
                })
                playSong(audio)
            } catch(error) {
                console.error('Error al crear audio desde URL:', error)
            }
        }
        return null
    }
    
    for (const song in songs)
        if (lowerText === song) {
            playSong(songs[song])
            return null
        }
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|net|org|io|tv|gg|xyz|me|co)[^\s]*)/gi
    return text.replace(urlRegex, 'LINK PENDEJO')
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
