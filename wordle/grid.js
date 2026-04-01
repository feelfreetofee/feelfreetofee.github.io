export default class CanvasSquareGrid {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} columns
     * @param {number} rows
     */
    constructor(width, height, columns, rows, gap = 0) {
        this.width = width
        this.height = height

        this.columns = columns
        this.rows = rows

        this.gap = gap

        this.squareSize = Math.floor(Math.min(
            (this.height - this.gap * (this.columns - 1)) / this.columns,
            (this.width - this.gap * (this.rows - 1)) / this.rows
        ))
        this.squareHalfSize = Math.floor(this.squareSize / 2)
        this.squareOffset = this.squareSize + this.gap
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number} column
     * @param {number} row
     * @param {number | undefined} lineWidth
     */
    square(context, x, y, column, row, lineWidth) {
        context.rect(
            x + this.squareOffset * row,
            y + this.squareOffset * column,
            this.squareSize,
            this.squareSize
        )

        if (lineWidth)
            context.rect(
                x + this.squareOffset * row + lineWidth,
                y + this.squareOffset * column + lineWidth,
                this.squareSize - lineWidth * 2,
                this.squareSize - lineWidth * 2
            )
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number | undefined} lineWidth
     */
    squares(context, x, y, lineWidth) {
        for (let column = 0; column < this.columns; column++)
            for (let row = 0; row < this.rows; row++)
                this.square(context, x, y, column, row, lineWidth)
    }
}