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

async function askGemini(question) {
    const apiKey = localStorage.getItem('gemini_api_key')
    if (!apiKey) {
        return 'No hay API key configurada.'
    }
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: question
                    }]
                }]
            })
        })
        
        if (!response.ok) {
            const error = await response.json()
            return `Error: ${error.error?.message || 'Error al consultar Gemini'}`
        }
        
        const data = await response.json()
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text
        
        if (!answer) {
            return 'Error: No se recibió respuesta de Gemini'
        }
        
        return answer.length > 500 ? answer.substring(0, 497) + '...' : answer
    } catch (error) {
        console.error('Error al consultar Gemini:', error)
        return `Error: ${error.message}`
    }
}

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
    
    if (lowerText.startsWith('!pregunta ') || lowerText.startsWith('!gemini-key ')) {
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
    const chatter_user_id = data.payload.event.chatter_user_id
    
    if (chatter_user_id === client.user_id) return
    
    const lowerText = text.toLowerCase().trim()
    
    if (lowerText === '!hola') {
        const broadcaster_id = client.user_id
        const username = data.payload.event.chatter_user_name || data.payload.event.chatter_user_login || 'amigo'
        client.sendMessage(broadcaster_id, `¡Hola ${username}! 👋`).catch(err => {
            console.error('Error al enviar mensaje:', err)
        })
        return
    }
    
    const geminiKeyMatch = text.match(/^!gemini-key\s+(.+)$/i)
    if (geminiKeyMatch) {
        const apiKey = geminiKeyMatch[1].trim()
        localStorage.setItem('gemini_api_key', apiKey)
        const broadcaster_id = client.user_id
        client.sendMessage(broadcaster_id, 'API key de Gemini configurada correctamente').catch(err => {
            console.error('Error al enviar mensaje:', err)
        })
        return
    }
    
    const geminiMatch = text.match(/^!pregunta\s+(.+)$/i)
    if (geminiMatch) {
        const question = geminiMatch[1].trim()
        const broadcaster_id = client.user_id
        const username = data.payload.event.chatter_user_name || data.payload.event.chatter_user_login || 'Usuario'
        
        client.sendMessage(broadcaster_id, `🤔 ${username}, déjame pensar...`).catch(err => {
            console.error('Error al enviar mensaje:', err)
        })
        
        askGemini(question).then(answer => {
            client.sendMessage(broadcaster_id, `💬 ${username}: ${answer}`).catch(err => {
                console.error('Error al enviar mensaje:', err)
            })
        }).catch(err => {
            client.sendMessage(broadcaster_id, `Error: ${err.message}`).catch(sendErr => {
                console.error('Error al enviar mensaje:', sendErr)
            })
        })
        return
    }
    
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
