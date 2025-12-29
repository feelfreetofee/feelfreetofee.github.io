const languageDetector = window?.LanguageDetector && await LanguageDetector.create({
    expectedInputLanguages: [
        'en-US',
        'es-ES',
    ]
})

export default languageDetector ? function(text) {
    return languageDetector.detect(text)
    .then(r => r.find(({detectedLanguage}) =>
        languageDetector.expectedInputLanguages.includes(detectedLanguage)
    ))
} : function() {
    return new Promise(resolve => resolve(languageDetector.expectedInputLanguages[0]))
}