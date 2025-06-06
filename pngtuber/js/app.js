import {create as createElement} from '../../js/element'

import {dialog, progress, range, previews} from './ui.js'

export const image = createElement(document.body, 'img', {
	onclick() {
		dialog.showModal()
	},
	update(value) {
		progress.value = value

		const src = previews[this.className = progress.value < range.value ? 'close' : 'open'].img.src
		if (this.src !== src)
			this.src = src
	}
})
