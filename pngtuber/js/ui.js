import {create as createElement} from '../../js/element'

export const dialog = createElement(document.body, 'dialog', {
	onclick({target}) {
		if (this === target)
			this.close()
	}
})

const threshold = createElement(dialog, 'threshold')
export const progress = createElement(threshold, 'progress')
export const range = createElement(threshold, 'input', {
	type: 'range',
	max: 1,
	step: .1,
	value: localStorage.getItem('threshold'),
	onchange() {
		localStorage.setItem('threshold', this.value)
	}
})

export const previews = {}

const templates = localStorage.templates ? JSON.parse(localStorage.templates) : []

const defaultTemplates = {
	soyjak: {
		open: 'https://i.imgur.com/IW4KcWv.png',
		close: 'https://i.imgur.com/cmFd26w.png'
	},
	popcat: {
		open: 'https://i.imgur.com/aRSu5ux.png', 
		close: 'https://i.imgur.com/eYA59tA.png'
	},
	bunny: {
		open: 'https://i.imgur.com/bn5kRIY.png',
		close: 'https://i.imgur.com/DNa5nSZ.png'
	},
	dog: {
		open: 'https://i.imgur.com/PzN1wK8.png',
		close: 'https://i.imgur.com/RjxYNU4.png'
	},
}

const options = {}

const select = createElement(dialog, 'select', {
    onchange() {
		if (this.selectedIndex < 0)
			this.selectedIndex = 0

		const {text, value, defaultSelected} = this.options[this.selectedIndex]

		localStorage.setItem('template', value)

		options.rename.value = text

		options.delete.disabled =
		options.rename.disabled = defaultSelected

		for (const key in previews) {
			previews[key].input.disabled = defaultSelected
			previews[key].img.src =
				defaultSelected
				? defaultTemplates[value][key]
				: localStorage[`${value}-${key}`]
		}
    }
})

function createTemplate(text, value, defaultSelected, selected) {
	return select.options[select.options.length] =
		new Option(text, value, defaultSelected, selected)
}

for (const key in defaultTemplates)
	createTemplate(key, key, true)

for (const key of templates)
	createTemplate(localStorage[`${key}-name`], key)

options.new = createElement(dialog, 'button', {
	innerText: 'New',
	onclick() {
		const value = Date.now()

		templates.push(value)
		localStorage.templates = JSON.stringify(templates)

		for (const key in previews)
			localStorage[`${value}-${key}`] = previews[key].img.src

		createTemplate(
			localStorage[`${value}-name`] =
			`${select.options[select.selectedIndex].text} ${value}`,
			value,
			false,
			true
		)
		select.onchange()
	}
})

options.rename = createElement(dialog, 'input', {
	onchange() {
		localStorage[`${select.value}-name`] =
		select.options[select.selectedIndex].text = this.value
	}
})

options.delete = createElement(dialog, 'button', {
	innerText: 'Delete',
	onclick() {
		const {value} = select
		templates.splice(templates.indexOf(value), 1)
		localStorage.templates = JSON.stringify(templates)

		localStorage.removeItem(`${value}-name`)

		for (const key in previews)
			localStorage.removeItem(`${value}-${key}`)

		select.options[select.selectedIndex].remove()
		select.onchange()
	}
})

function uploadPreview(key, [file]) {
	if (file?.type !== 'image/png')
		return
	const fileReader = new FileReader
	fileReader.addEventListener('load', () =>
		localStorage[`${select.value}-${key}`] =
		previews[key].img.src = fileReader.result)
	fileReader.readAsDataURL(file)
	return false
}

function createPreview(key) {
	const label = createElement(dialog, 'label')
	label.img = createElement(label, 'img', {
		title: key,
		ondragover: () => false,
		ondrop({dataTransfer}) {
			if (!label.input.disabled)
				return uploadPreview(key, dataTransfer.files)
		}
	})
	label.input = createElement(label, 'input', {
		type: 'file',
		accept: 'image/png',
		onchange() {
			uploadPreview(key, this.files)
		}
	})
	return label
}

previews.close = createPreview('close')
previews.open = createPreview('open')

select.onchange(select.value = localStorage.getItem('template'))