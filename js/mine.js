"use strict"

const MINE = '💣'

// var minesNegsCount = []

var mines = []


function createMines(totalMines, board) {
    for (var i = 0; i < totalMines; i++) {
        var idx = getRandomIntInclusive(0, board.length - 1)
        var jdx = getRandomIntInclusive(0, board[idx].length - 1)

        // while (gBoard[idx][jdx].isMine) {
        //     idx = getRandomIntInclusive(0, board.length - 1)
        //     jdx = getRandomIntInclusive(0, board[0].length - 1)
        // }
        gBoard[idx][jdx].isMine = true

        var newMine = {
            location: { i: idx, j: jdx },
        }
        mines.push(newMine)
    }
    console.log(mines)
}


function setMines(board) {
    for (var i = 0; i < mines.length; i++) {
        var currMineLocation = mines[i].location
        board[currMineLocation.i][currMineLocation.j].isMine = true
    }
}

function setMinesNegsCount(size) {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            gBoard[i][j].minesAroundCount = cellNegsCount(i, j, gBoard)
            // console.log(gBoard[i][j].minesAroundCount)
        }
    }

}

function renderMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) {
                var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
                renderCell({ i, j }, MINE)
                elCurrCell.style.backgroundColor = 'lightsalmon'

            }
        }
    }
}

function firstClickNotMine(board, idx, jdx) {
    if (board[idx][jdx].isMine) {
        board[idx][jdx].isMine = false
        renderCell({ idx, jdx }, EMPTY)
        expandShown(gBoard, idx, jdx)
        for (var i = idx - 1; i <= idx + 1; i++) {
            if (i < 0 || i >= board.length) continue
            for (var j = jdx - 1; j <= jdx + 1; j++) {
                if (j < 0 || j >= board[i].length) continue
                if (i === idx && j === jdx) continue
                board[i][j].minesAroundCount--
                var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
                elCurrCell.innerText = `${board[i][j].minesAroundCount}`
            }
        }
    }
}