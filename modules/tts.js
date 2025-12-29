export default function(text, lang = 'en-US') {
    return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = lang
        utterance.addEventListener('end', resolve)
        utterance.addEventListener('error', error => (
            error.error === 'interrupted'
            || error.error === 'canceled'
            ? resolve : reject
        )(error))
        speechSynthesis.speak(utterance)
    })
}