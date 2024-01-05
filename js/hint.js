"use strict"

const HINT = '💡'

var hints = []


function showhint(board, idx, jdx) {
    for (var i = idx - 1; i <= idx + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = jdx - 1; j <= jdx + 1; j++) {

            if (j < 0 || j >= board[i].length) continue

            if (board[i][j] === HINT) continue

            showNegsNum(gBoard, i, j)
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            const elHintCell = document.querySelector(`.cell-${idx}-${jdx}`)
            const flagsCount = document.querySelector('.flag-count')

            if (board[i][j] === FLAG) {
                gGame.totalFlags++
                flagsCount.innerText = `${gGame.totalFlags}`

            }

            if (board[i][j] === MINE) elCell.innerText = MINE

            elCell.style.backgroundColor = 'lightyellow'
            elHintCell.style.backgroundColor = 'lightyellow'
            setTimeout(() => {

                board[idx][jdx] = ''
                elCell.innerText = ''
                elHintCell.innerText = ''
                elHintCell.style.backgroundColor = 'rgb(229, 158, 202)'
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

