import Canvas2D from './canvas2D'
import Grid from './grid'

const canvas = new Canvas2D(document.body.firstElementChild)

const gameCanvas = new Canvas2D

canvas.addLayer(gameCanvas)

const gameCanvasGrid = new Canvas2D

gameCanvas.addLayer(gameCanvasGrid)

const gameCanvasSquares = new Canvas2D

gameCanvas.addLayer(gameCanvasSquares)

const gameCanvasInput = new Canvas2D

gameCanvas.addLayer(gameCanvasInput)

// Clanker ahh code
const words = [
  // 3 letters
  "cat","dog","sun","sky","sea","pen","cup","hat","map","run","red","box","car","bed","key","toy","win","log","ice","egg",

  // 4 letters
  "tree","rock","moon","star","wind","fire","water","sand","book","code","game","play","walk","talk","read","blue","fast","slow","hard","soft",

  // 5 letters
  "apple","grape","peach","chair","table","plant","light","sound","touch","smile","laugh","think","build","break","start","close","bring","catch","throw","write",

  // 6 letters
  "banana","orange","castle","forest","desert","ocean","planet","galaxy","silver","golden","bright","shadow","little","simple","random","system","object","number","string","return"
];

class Game {
    columns = [[]]
    /**
     * @param {string} word 
     */
    constructor(word) {
        this.word = word
        this.grid = new Grid(canvas.element.width, canvas.element.height, this.word.length + 1, this.word.length, 6)
        this.drawGrid()
    }
    drawGrid() {
        const {context} = gameCanvasGrid

        context.fillStyle = 'lightgrey'

        context.beginPath()

        this.grid.squares(context, 0, 0, 2)

        context.fill('evenodd')

        canvas.renderLayers()
    }
    /**
     * @param {CanvasRenderingContext2D} context
     * @param {number} columnIndex
     * @param {number} rowIndex
     */
    drawRowCharacter(context, columnIndex, rowIndex) {
        context.font = `bold ${this.grid.squareSize * .75}px sans`
        context.textAlign = 'center'
        context.textBaseline = 'middle'

        context.fillText(
            this.columns[columnIndex][rowIndex].toUpperCase(),
            this.grid.squareOffset * rowIndex + this.grid.squareHalfSize,
            this.grid.squareOffset * columnIndex + this.grid.squareHalfSize
        )
    }
    /**
     * @param {number} columnIndex
     * @param {number} rowIndex
     */
    drawRow(columnIndex, rowIndex) {
        const {context} = gameCanvasSquares

        const character = this.columns[columnIndex][rowIndex]

        context.fillStyle =
            character === this.word[rowIndex]
            ? 'green'
            : this.word.includes(character)
            ? 'yellow'
            : 'grey'

        context.beginPath()

        this.grid.square(context, 0, 0, columnIndex, rowIndex)

        context.fill()

        context.fillStyle = 'white'

        this.drawRowCharacter(context, columnIndex, rowIndex)
    }
    /**
     * @param {number} columnIndex
     */
    drawColumn(columnIndex) {
        for (let rowIndex = 0; rowIndex < this.columns[columnIndex].length; rowIndex++)
            this.drawRow(columnIndex, rowIndex)
    }
    clearInput() {
        gameCanvasInput.clear()
    }
}

const game = new Game(words[Math.floor(Math.random() * words.length)])

const Keys = {
    Backspace() {
        const columnIndex = game.columns.length - 1

        const column = game.columns[columnIndex]

        if (column.length === 0)
            return

        column.pop()

        game.clearInput()
        
        for (let rowIndex = 0; rowIndex < column.length; rowIndex++)
            game.drawRowCharacter(gameCanvasInput.context, columnIndex, rowIndex)

        return true
    },
    Enter() {
        const columnIndex = game.columns.length - 1

        const column = game.columns[columnIndex]

        if (column.length < game.word.length)
            return

        game.clearInput()

        game.drawColumn(columnIndex)

        if (column.join('') === game.word) {
            game.inputDisabled = true

        } else if (game.columns.length >= game.word.length + 1) {
            game.inputDisabled = true

        } else
            game.columns.push([])

        return true
    }
}

function Key(key) {
    if (key < 'a' || key > 'z')
        return
    
    const columnIndex = game.columns.length - 1

    const column = game.columns[columnIndex]

    if (column.length >= game.word.length)
        return

    const rowIndex = column.push(key) - 1

    game.drawRowCharacter(gameCanvasInput.context, columnIndex, rowIndex)

    return true
}

document.addEventListener('keydown', ({key}) => {
    if (game.inputDisabled)
        return

    const keyListener = Keys[key]

    if (keyListener ? keyListener() : Key(key))
        canvas.renderLayers()
})