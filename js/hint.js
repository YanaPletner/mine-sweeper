"use strict"

const HINT = '💡'

var hints = []


function showhint(board, idx, jdx) {
    for (var i = idx - 1; i <= idx + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = jdx - 1; j <= jdx + 1; j++) {

            if (j < 0 || j >= board[i].length) continue

            showNegsNum(gBoard, i, j)
            const elCell = document.querySelector(`.cell-${i}-${j}`)

            if (board[i][j] === FLAG) {
                gGame.totalFlags++
                var flagsCount = document.querySelector('.flag-count')
                flagsCount.innerText = `${gGame.totalFlags}`
            }

            if (board[i][j] === MINE) {
                elCell.innerText = MINE
                renderCell({ i, j }, MINE)
            }

            elCell.style.backgroundColor = 'lightyellow'

            setTimeout(() => {
                board[idx][jdx] = ''
                elCell.innerText = ''
                elCell.style.backgroundColor = 'rgb(229, 158, 202)'

            }, 1000)


        }
    }
}

function makeHintsArr(board) {
    for (var i = 0; i < gGame.totalHints; i++) {
        var idx = getRandomIntInclusive(0, board.length - 1)
        var jdx = getRandomIntInclusive(0, board.length - 1)

        while (board[idx][jdx] === MINE) {
            idx = getRandomIntInclusive(0, board.length - 1)
            jdx = getRandomIntInclusive(0, board.length - 1)
        }
        hints.push({ location: { i: idx, j: jdx } })
    }
}


function setHints(hints, board) {
    for (var i = 0; i < hints.length; i++) {
        board[hints[i].location.i][hints[i].location.j] = HINT
        renderCell({ i: hints[i].location.i, j: hints[i].location.j }, HINT)
    }
}
