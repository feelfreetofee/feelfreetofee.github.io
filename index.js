const main = document.body.create('main')

const projects = {
	caseTool: {
		href: 'casetool',
		label: 'CaseTool',
		description: 'SCREAMING_SNAKE_CASE'
	}
}

for (const project in projects) {
	const {href, label, description} = projects[project]
	const element = main.create('a', {href})
	element.create('h1', {innerText: label})
	element.create('p', {innerText: description})
}