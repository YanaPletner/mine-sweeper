"use strict"

const MINE = '💣'

const minesNegsCount = []

const mines = []


function createMines(totalMines, board) {
    for (var i = 0; i < totalMines - 1; i++) {
        var idx = getRandomIntInclusive(0, board.length - 1)
        var jdx = getRandomIntInclusive(0, board[0].length - 1)
        if (gBoard[idx][jdx] === MINE) continue
        else {
            gBoard[idx][jdx] = MINE

            var newMine = {
                location: { i: idx, j: jdx },
            }
            mines.push(newMine)
        }
    }

    // board[1][2] = MINE
    // renderCell({ i: 1, j: 2 }, MINE)
    // board[3][3] = MINE
    // renderCell({ i: 3, j: 3 }, MINE)
    // board[3][3] = MINE
    // renderCell({ i: 4, j: 1 }, MINE)
    // board[3][3] = MINE
    // renderCell({ i: 2, j: 2 }, MINE)
    // board[3][3] = MINE
    // renderCell({ i: 6, j: 3 }, MINE)
    // mines.push({ location: { i: 1, j: 2 }, gameElement: MINE })
    // mines.push({ location: { i: 3, j: 3 }, gameElement: MINE })
    // mines.push({ location: { i: 4, j: 1 }, gameElement: MINE })
    // mines.push({ location: { i: 2, j: 2 }, gameElement: MINE })
    // mines.push({ location: { i: 6, j: 3 }, gameElement: MINE })
    // console.log(mines)
}


function placeMinesRandomly(board) {
    // console.log(board)
    for (var i = 0; i < mines.length; i++) {
        var currMineLocation = mines[i].location
        board[currMineLocation.i][currMineLocation.j] = MINE
        // renderCell(currMineLocation, MINE)
    }
    // console.log(board)
}

function setMinesNegsCount(num) {
    for (var i = 0; i < num; i++) {
        minesNegsCount.push([])
        for (var j = 0; j < num; j++) {
            var minesAroundCount = negsCountForCell(i, j, gBoard)
            // console.log(i, j, minesAroundCount)
            // console.log(minesAroundCount)
            // if (minesAroundCount === 0) {
            //     minesNegsCount[i].push(EMPTY)
            //     continue
            // }
            // else 
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
                currCell.style.backgroundColor = 'lightsalmon'
            }
        }
    }
}

