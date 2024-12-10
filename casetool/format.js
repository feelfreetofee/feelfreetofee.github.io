String.prototype.capitalize = function() {
	return this[0].toUpperCase() + this.slice(1).toLowerCase()
}

function caseFormat(words = [], method = 'capitalize') {
	const result = []
	for (const word of words)
		result.push(word[method]())
	return result
}

function camelFormat(words) {
	if (words.length)
		words[0] = words[0].toLowerCase()
	return words
}

const cases = {
	camelCase: words => camelFormat(caseFormat(words)).join(''),
	PascalCase: words => caseFormat(words).join(''),
	'kebab-case': words => caseFormat(words, 'toLowerCase').join('-'),
	'camel-Kebab-Case': words => camelFormat(caseFormat(words)).join('-'),
	'Train-Case': words => caseFormat(words).join('-'),
	'COBOL-CASE': words => caseFormat(words, 'toUpperCase').join('-'),
	snake_case: words => caseFormat(words, 'toLowerCase').join('_'),
	camel_Snake_Case: words => camelFormat(caseFormat(words)).join('_'),
	Pascal_Snake_Case: words => caseFormat(words).join('_'),
	SCREAMING_SNAKE_CASE: words => caseFormat(words, 'toUpperCase').join('_')
}