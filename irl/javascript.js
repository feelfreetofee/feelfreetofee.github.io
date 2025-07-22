Element.prototype.createElement = function(localName, options) {
    return Object.assign(this.appendChild(
        document.createElement(localName, options)
    ), options)
}

String.prototype.capitalize = function() {
    return this.at().toUpperCase() + this.slice(1)
}