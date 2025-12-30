import {default as languageDetector} from '../../../modules/languageDetector'
import {default as tts} from '../../../modules/tts'

/**
 * @param {{type: 'text' | 'emote', text?: string}[]} fragments 
 */
function sanitizeMessage(fragments) {
    return fragments
    .map(({type, text}) => type === 'text' && text.trim())
    .filter(text => text)
    .join(' ')
    .replace(/https?:\/\/[^\s]+/g, 'link pendejo')
    .replace(/[^A-zÀ-ú0-9\s.,:;¿?¡!$€£ç+-/]+/gi, '')
    .trim()
    || undefined
}

export default function({
    broadcaster_user_id,
    chatter_user_id,
    message: {fragments}
}) {
    if (broadcaster_user_id === chatter_user_id) return
    const text = sanitizeMessage(fragments)
    if (text.includes('streamboo')) return
    if (text) languageDetector(text)
    .then(r => tts(text, r?.detectedLanguage))

}
