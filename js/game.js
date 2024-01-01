"use strict"

const EMPTY = ''
const FLAG = '🚩'

var gGame = {
    score: 0,
    isOn: false,
    isMineShown: false,
    totalFlags: 10,
    totalMines: 5,
    totalLife: 3
}

var gBoard


function onInit(num) {
    // console.log('hello')
    gBoard = buildBoard(num)
    renderBoard(gBoard, '.board-container')
    createMines(gGame.totalMines, gBoard)
    setMinesNegsCount(num)
    placeMinesRandomly(gBoard)

    var flags = document.querySelector('.flag-count')
    flags.innerText = `${gGame.totalFlags}`

    var sadFace = document.querySelector('.life')
    sadFace.innerHTML = 'Life: <span id="life-1">❤️</span><span id="life-2">❤️</span><span id="life-3">❤️</span>'
    sadFace.style.fontSize = '20px'
    // console.log(minesNegsCount)
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
            <span class="flag-${i}-${j} hide-flag">🚩</span></td>`  //oncontextmenu="onCellMarked(event)" onmouseup="onCellMarked(this)"
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

    console.log(ev)
    switch (ev.button) {
        case 0:

            break;

        case 2:
            gGame.totalFlags--
            if (gGame.totalFlags >= 0) {
                console.log('left')
                ev.preventDefault()

                gBoard[i][j] = FLAG
                renderCell({ i, j }, FLAG)

                elCell.style.backgroundColor = 'lightpink'
                elCell.style.cursor = 'pointer'

                var flagsCount = document.querySelector('.flag-count')
                flagsCount.innerText = `${gGame.totalFlags}`

                var flagHide = document.querySelector(`.flag-${i}-${j}>span`) //.flag-${i}-${j}`)
                flagHide.innerText === FLAG ? flagHide.innerText = "" : flagHide.innerText = FLAG
            }

            break;
    }
}


function onCellClicked(elCell, i, j) {
    showNegsNum(gBoard, i, j)

    if (gBoard[i][j] === MINE) {
        showMines(gBoard)
        var life = document.querySelector(`#life-${gGame.totalLife}`)
        life.classList.add('hidden')
        if (life.innerText !== '') gGame.totalLife--
        if (gGame.totalLife === 0) {
            var sadFace = document.querySelector('.life')
            sadFace.innerText = '😞'
            sadFace.style.fontSize = "40px"
            const modal = document.querySelector('.modal')
            modal.classList.remove('.hidden')
        }
    }
    else {

    }
}



function gameOver() {
    const modal = document.querySelector('.modal')
    modal.classList.remove('.hidden')
}

function playAgain(num) {
    gGame.totalFlags = 10
    onInit(num)
    console.log('play again')
}




