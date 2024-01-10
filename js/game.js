"use strict"

const EMPTY = ''
const FLAG = '🚩'

var gBoard
var gBestScore
var gTimeInterval

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    score: 0,
    isOn: false,
    isOnHint: false,
    isMineShown: false,
    cellClickNum: 0,
    totalLife: 3,
    totalHints: 3,
    totalFlags: 10,
    totalMines: 5
}

function onInit(size) {
    gGame.isOn = true
    gLevel.SIZE = size

    gBoard = buildBoard(size)
    renderBoard(gBoard, '.board-container')
    renderHints()
    renderFlagCount()
    renderLife()
    resetTimer()

    const elGameOver = document.querySelector('.end')
    elGameOver.classList.add('hidden')
    var heighestScore = document.querySelector('.highest-score')
    heighestScore.innerText = scoresArr[0] ? scoresArr[0] : '0'

}

function buildBoard(size) {
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isHint: false,
                isShown: false,
                isMine: false,
                isMarked: false
            }

        }
    }
    return board
}


function renderBoard(board, selector) {
    var strHTML = '<table><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}" oncontextmenu="onCellMarked(this,event,${i},${j})" 
            onclick ="onCellClicked(this,${i},${j})">
            <span class="flag-${i}-${j}"></span></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function cellNegsCount(rowIdx, colIdx, board) {
    var neighborsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            if (board[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount
}

function expandShown(board, idx, jdx) {
    for (var i = idx - 1; i <= idx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = jdx - 1; j <= jdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue

            if (board[idx][jdx].minesAroundCount === 0 & !board[idx][jdx].isMine) {
                var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
                elCurrCell.innerText = `${board[i][j].minesAroundCount}`
                elCurrCell.style.backgroundColor = 'rgb(222, 94, 167)'
                board[i][j].isShown = true

                if (board[i][j].minesAroundCount === 0) {
                    elCurrCell.innerText = EMPTY
                }
            }
        }
    }
    if (board[idx][jdx].minesAroundCount !== 0 && !board[idx][jdx].isMine) {
        var elCurrCell = document.querySelector(`.cell-${idx}-${jdx}`)
        elCurrCell.innerText = `${board[idx][jdx].minesAroundCount}`
        elCurrCell.style.backgroundColor = 'rgb(222, 94, 167)'
        board[idx][jdx].isShown = true
    }
}

function onCellMarked(elCell, ev, i, j) {
    if (!gGame.isOn) return
    if (gBoard[i][j].isShown) return
    if (gBoard[i][j].isMineShown) return
    switch (ev.button) {
        case 2:
            ev.preventDefault()

            if (gGame.totalFlags) {
                if (gBoard[i][j].isMarked) {
                    gGame.totalFlags++
                    renderCell({ i, j }, EMPTY)
                    gBoard[i][j].isMarked = false

                } else {
                    gGame.totalFlags--
                    renderCell({ i, j }, FLAG)
                    gBoard[i][j].isMarked = true
                }

                if (gGame.totalFlags >= 0) {
                    elCell.style.backgroundColor = 'rgb(229, 158, 202)'
                    elCell.style.cursor = 'pointer'

                    var elFlagsCount = document.querySelector('.flag-count')
                    elFlagsCount.innerText = `${gGame.totalFlags}`
                }
            }
            break;
    }
    checkVictory(gBoard)
}


function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gBoard[i][j].isMarked) return
    if (gBoard[i][j].isMineShown) return
    if (gBoard[i][j].isShown) return

    gBoard[i][j].isShown = true
    elCell.style.backgroundColor = 'rgb(222, 94, 167)'
    gGame.cellClickNum++

    if (gGame.isOnHint) return showhint(gBoard, i, j)

    if (gGame.cellClickNum === 1) {
        startTimer()
        createMines(gGame.totalMines, gBoard)
        setMines(gBoard)
        setMinesNegsCount(gLevel.SIZE)
        firstClickNotMine(gBoard, i, j)
    }

    expandShown(gBoard, i, j)

    if (gBoard[i][j].isMine) {
        console.log('mine')
        gBoard[i][j].isMineShown = true
        renderCell({ i, j }, MINE)

        elCell.style.backgroundColor = "lightsalmon"

        if (gGame.totalLife) {
            var elLife = document.querySelector(`.life-${gGame.totalLife}`)
            elLife.classList.add('hidden')
            gGame.totalLife--
        }

        if (!gGame.totalLife) {
            endGame()
        }
    }
    checkVictory(gBoard)
}


function endGame() {
    renderMines(gBoard)
    clearInterval(gTimeInterval)
    const elGameOver = document.querySelector('.end')
    elGameOver.classList.remove('hidden')
    const elLife = document.querySelector('.life')
    elLife.innerText = '😞'
    elLife.style.fontSize = "40px"
    gGame.isOn = false
}

function checkVictory(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isShown || board[i][j].isMarked && !board[i][j].isMineShown) {
                continue
            }
            else return
        }
    }

    clearInterval(gTimeInterval)
    const elGameOver = document.querySelector('.end')
    elGameOver.classList.remove('hidden')
    const elLife = document.querySelector('.life')
    elLife.innerText = '😊 Victory'
    elLife.style.fontSize = "40px"
    gGame.isOn = false
    updateScore()
}


function playAgain(size) {
    gGame.totalLife = 3
    gGame.totalFlags = 10
    mines = []
    onInit(size)
}

function renderLife() {
    var elLife = document.querySelector('.life')
    elLife.innerHTML = ''
    elLife.innerHTML += 'Life: '
    for (var i = 0; i < gGame.totalLife; i++) {
        elLife.innerHTML += `<span class="life-${i + 1}">❤️</span>`
    }
    elLife.style.fontSize = '20px'
}

function renderFlagCount() {
    var elFlags = document.querySelector('.flag-count')
    elFlags.innerText = `${gGame.totalFlags}`
}

function resetTimer() {
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = '0.000'
}