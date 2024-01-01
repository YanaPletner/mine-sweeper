"use strict"

const EMPTY = ''
const FLAG = '🚩'

var gGame = {
    score: 0,
    isOn: false,
    isMineShown: false,
    totalFlags: 10,
    totalMines: 5,
    totalLife: 3,
    cellClickCount: 0
}

var gBoard

function onInit(num) {
    gGame.isOn = false
    gBoard = buildBoard(num)
    renderBoard(gBoard, '.board-container')
    createMines(gGame.totalMines + num, gBoard)

    var flags = document.querySelector('.flag-count')
    flags.innerText = `${gGame.totalFlags}`

    var sadFace = document.querySelector('.life')
    sadFace.innerHTML = 'Life: <span id="life-1">❤️</span><span id="life-2">❤️</span><span id="life-3">❤️</span>'
    sadFace.style.fontSize = '20px'

    const gameOver = document.querySelector('.end')
    gameOver.classList.add('hidden')
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

            strHTML += `<td class="${className} " oncontextmenu="onCellMarked(this,event,${i},${j})" 
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
                currCell.style.backgroundColor = 'rgb(243, 135, 151)'
            }
        }
    }
}

function onCellMarked(elCell, ev, i, j) {
    switch (ev.button) {
        case 2:
            ev.preventDefault()

            if (gBoard[i][j] === FLAG) {
                gGame.totalFlags++
                renderCell({ i, j }, EMPTY)
                gBoard[i][j] = EMPTY

            } else {
                gGame.totalFlags--
                renderCell({ i, j }, FLAG)
                gBoard[i][j] = FLAG
            }

            if (gGame.totalFlags >= 0) {
                elCell.style.backgroundColor = 'lightpink'
                elCell.style.cursor = 'pointer'

                var flagsCount = document.querySelector('.flag-count')
                flagsCount.innerText = `${gGame.totalFlags}`
            }
            break;
    }
}


function onCellClicked(elCell, i, j) {
    gGame.cellClickCount++

    if (gBoard[i][j] === FLAG) {
        gGame.totalFlags++
        renderCell({ i, j }, EMPTY)
        gBoard[i][j] = EMPTY

        var flagsCount = document.querySelector('.flag-count')
        flagsCount.innerText = `${gGame.totalFlags}`
    }

    if (gGame.cellClickCount === 1) {
        createMines(0, gBoard)
        elCell.style.backgroundColor = 'rgb(243, 135, 151)'

    } else {
        placeMinesRandomly(gBoard)
        setMinesNegsCount(gBoard.length)
        showNegsNum(gBoard, i, j)
    }

    if (gBoard[i][j] === MINE && gGame.cellClickCount !== 1) {
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
            gGame.isOn = false
        }
    }
}


function playAgain(num) {
    gGame.isOn = true
    gGame.totalFlags = 10
    gGame.totalMines = 5
    gGame.totalLife = 3
    gGame.cellClickCount = 0
    minesNegsCount = []
    mines = []
    onInit(num)
}



