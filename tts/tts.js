export function tts(text, lang = 'en-US') {
    return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.addEventListener('end', resolve)
        utterance.addEventListener('error', reject)
        speechSynthesis.speak(utterance)
    })
}

const speakQueue = []

export async function TTS(text, lang) {
    const speaking = speakQueue.length
    speakQueue.push(text)
    if (speaking) return
    while (speakQueue.length > 0) {
        await tts(speakQueue.at(0), lang)
        speakQueue.shift()
    }

}

export function stopTTS() {
    speechSynthesis.cancel()
    speakQueue.length = 0
}
