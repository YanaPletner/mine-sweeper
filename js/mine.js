"use strict"

const MINE = '💣'

var minesNegsCount = []

var mines = []


function createMines(totalMines, board) {
    for (var i = 0; i < totalMines; i++) {
        var idx = getRandomIntInclusive(0, board.length - 1)
        var jdx = getRandomIntInclusive(0, board[0].length - 1)

        while (gBoard[idx][jdx] === MINE) {
            idx = getRandomIntInclusive(0, board.length - 1)
            jdx = getRandomIntInclusive(0, board[0].length - 1)
        }
        gBoard[idx][jdx] = MINE

        var newMine = {
            location: { i: idx, j: jdx },
        }
        mines.push(newMine)
    }
}


function placeMinesRandomly(board) {
    for (var i = 0; i < mines.length; i++) {
        var currMineLocation = mines[i].location
        board[currMineLocation.i][currMineLocation.j] = MINE
    }
}

function setMinesNegsCount(num) {
    for (var i = 0; i < num; i++) {
        minesNegsCount.push([])

        for (var j = 0; j < num; j++) {
            var minesAroundCount = negsCountForCell(i, j, gBoard)
            minesNegsCount[i].push(minesAroundCount)
        }
    }
}

function showMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === MINE) {
                var currCell = document.querySelector(`.cell-${i}-${j}`)
                currCell.innerText = MINE
                // renderCell({ i, j }, MINE)
                // showNegsNum(gBoard, i, j)
                currCell.style.backgroundColor = 'lightsalmon'

            }
        }
    }
}

