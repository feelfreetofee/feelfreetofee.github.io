export default class Canvas2D extends EventTarget {
    constructor(element = document.createElement('canvas')) {
        super()

        this.element = element
        this.context = this.element.getContext('2d')
    }

    clear() {
        this.context.clearRect(0, 0, this.element.width, this.element.height)
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     */
    circle(x, y, radius) {
        this.context.beginPath()

        this.context.arc(x, y, radius, 0, 2 * Math.PI)
    }

    /** @type {Canvas2D[]} */
    layers = []

    addLayer(layer = new Canvas2D, index = this.layers.length) {
        if (this.layers.includes(layer))
            return

        layer.element.width = this.element.width
        layer.element.height = this.element.height

        this.layers.splice(index, 0, layer)
    }

    /**
     * @param {Canvas2D} layer
     */
    removeLayer(layer) {
        const index = this.layers.indexOf(layer)

        if (index === undefined)
            return
        
        this.layers.splice(index, 0, layer)
    }

    renderLayers() {
        if (this.layers.length === 0)
            return

        this.clear()

        for (const layer of this.layers) {
            layer.renderLayers()

            this.context.drawImage(layer.element, 0, 0)
        }
    }
}