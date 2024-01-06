"use strict"

const EMPTY = ''
const FLAG = '🚩'

var gBoard
var gBestScore = ''
var gTimeInterval
var gHintClickCount = 0
var gMineClickCount = 0
var gFlagClickCount = 0

var gGame = {
    score: 0,
    isOn: false,
    isMineShown: false,
    cellClickCount: 0,
    totalLife: 3,
    totalHints: 3,
    totalFlags: 10,
    totalMines: 5
}

function onInit(num) {
    gGame.isOn = true
    gBoard = buildBoard(num)
    renderBoard(gBoard, '.board-container')
    createMines(gGame.totalMines, gBoard)
    makeHintsArr(gBoard)
    setHints(hints, gBoard)
    var flags = document.querySelector('.flag-count')
    flags.innerText = `${gGame.totalFlags}`

    var life = document.querySelector('.life')
    life.innerHTML = 'Life: <span id="life-1">❤️</span>' +
        '<span id="life-2">❤️</span>' +
        '<span id="life-3">❤️</span>'
    life.style.fontSize = '20px'

    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '0.000'

    const gameOver = document.querySelector('.end')
    gameOver.classList.add('hidden')

    var heighestScore = document.querySelector('.highest-score')
    heighestScore.innerText = scoresArr[0] ? scoresArr[0] : '0'
}


function buildBoard(num) {
    const board = []
    for (var i = 0; i < num; i++) {
        board.push([])
        for (var j = 0; j < num; j++) {
            board[i][j] = EMPTY
        }
    }
    return board
}



function renderBoard(mat, selector) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}" oncontextmenu="onCellMarked(this,event,${i},${j})" 
            onclick ="onCellClicked(this,${i},${j})">${cell}
            <span class="flag-${i}-${j}"></span></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML

}


function showNegsNum(board, idx, jdx) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {

            if (board[i][j] === MINE) continue
            if (i === idx && j === jdx) {
                var currCell = document.querySelector(`.cell-${i}-${j}`)
                currCell.innerText = `${minesNegsCount[i][j]}`

                if (currCell.innerText === '0') currCell.innerText = EMPTY
                currCell.style.backgroundColor = 'rgb(222, 94, 167)'
            }
        }
    }
}

function onCellMarked(elCell, ev, i, j) {
    if (!gGame.isOn) return
    switch (ev.button) {
        case 2:
            ev.preventDefault()
            if (gBoard[i][j] === HINT) return

            if (gBoard[i][j] === FLAG) {

                gGame.totalFlags++

                gBoard[i][j] = EMPTY
                renderCell({ i, j }, EMPTY)
            } else {
                gGame.totalFlags--
                gBoard[i][j] = FLAG
                renderCell({ i, j }, FLAG)
            }

            if (gGame.totalFlags >= 0) {
                elCell.style.backgroundColor = 'rgb(229, 158, 202)'
                elCell.style.cursor = 'pointer'

                var flagsCount = document.querySelector('.flag-count')
                flagsCount.innerText = `${gGame.totalFlags}`
            }
            break;
    }
}


function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gGame.cellClickCount === 0) startTimer()

    gGame.cellClickCount++
    if (elCell.innerHTML === HINT) gHintClickCount++

    if (gBoard[i][j] === FLAG) return

    if (gGame.cellClickCount === 0) {
        startTimer()
        createMines(0, gBoard)
        elCell.style.backgroundColor = 'rgb(222, 94, 167)'

    } else {
        placeMinesRandomly(gBoard)
        setMinesNegsCount(gBoard.length)
        showNegsNum(gBoard, i, j)
        if (gBoard[i][j] === HINT) {
            showhint(gBoard, i, j)
        }
    }


    if (gBoard[i][j] === MINE && gGame.cellClickCount !== 1) {
        gMineClickCount++
        renderCell({ i, j }, MINE)
        showNegsNum(gBoard, i, j)
        elCell.style.backgroundColor = "lightsalmon"
        var life = document.querySelector(`#life-${gGame.totalLife}`)
        life.classList.add('hidden')

        if (life.innerText !== '') {
            gGame.totalLife--
        }

        if (gGame.totalLife === 0) {
            showMines(gBoard)
            const gameOver = document.querySelector('.end')
            gameOver.classList.remove('hidden')
            const sadFace = document.querySelector('.life')
            sadFace.innerText = '😞'
            sadFace.style.fontSize = "40px"
            clearInterval(gTimeInterval)
            gGame.isOn = false
        }
    }
    checkVictory()
}


function checkVictory() {
    var numOfcells = gBoard.length ** 2
    var flagsOnBoard = 10 - gGame.totalFlags
    if (numOfcells + gHintClickCount + gMineClickCount - flagsOnBoard <= gGame.cellClickCount) {
        updateScore()
        clearInterval(gTimeInterval)
        const gameOver = document.querySelector('.end')
        gameOver.classList.remove('hidden')
        const happyFace = document.querySelector('.life')
        happyFace.innerText = '😊 Victory'
        happyFace.style.fontSize = "40px"
        gGame.isOn = false
    }
}


function playAgain(num) {
    gHintClickCount = 0
    gMineClickCount = 0
    gFlagClickCount = 0
    gGame.cellClickCount = 0
    gGame.totalLife = 3
    gGame.totalFlags = 10
    minesNegsCount = []
    mines = []
    hints = []
    onInit(num)
}

function startTimer() {
    var startTime = Date.now()
    var elTimer = document.querySelector('.timer')

    gTimeInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const formattedTime = (elapsedTime / 1000).toFixed(3)
        elTimer.textContent = formattedTime
    }, 37)
}