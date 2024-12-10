Node.prototype.create = function(tag = 'div', source) {
	return Object.assign(this.appendChild(document.createElement(tag)), source)
}