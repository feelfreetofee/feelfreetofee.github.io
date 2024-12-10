const main = document.body.create('main')

const textarea = main.create('div')

const input = textarea.create('textarea')
const output = textarea.create('textarea')

const buttons = main.create('div')

const select = buttons.create('select')
for (const value in cases)
	select.create('option', {
		value,
		innerText: value
	})

buttons.create('button', {
	innerText: 'convert',
	onclick() {
		const result = []
		for (const line of input.value.split('\n'))
			result.push(cases[select.value](line.match(/[A-Z]?[a-z]+|[A-Z]+/g)))
		output.value = result.join('\n')
	}
})