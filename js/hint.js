"use strict"

const HINT = '💡'

function renderHints() {
    var elHints = document.querySelector('.hints')
    elHints.innerHTML = ''
    elHints.innerHTML += 'Hints: '
    for (var i = 0; i < gGame.totalHints; i++) {
        elHints.innerHTML += `<span class="hint" onclick="clickHint(this)">💡</span>`
    }
}

function clickHint(el) {
    if (!gGame.cellClickNum) return
    gGame.isOnHint = true
    el.classList.add('hidden')
}

function showhint(board, idx, jdx) {
    for (var i = idx - 1; i <= idx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = jdx - 1; j <= jdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMarked) continue

            // expandShown(board, i, j)
            var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
            elCurrCell.innerText = `${board[i][j].minesAroundCount}`
            if (board[i][j].minesAroundCount === 0) elCurrCell.innerText = EMPTY
            elCurrCell.style.backgroundColor = 'lightyellow'
            if (board[i][j].isMine) renderCell({ i, j }, MINE)
            // expandShown(board, i, j)
            setTimeout(() => {
                for (var i = idx - 1; i <= idx + 1; i++) {
                    if (i < 0 || i >= board.length) continue
                    for (var j = jdx - 1; j <= jdx + 1; j++) {
                        if (j < 0 || j >= board[i].length) continue
                        elCurrCell = document.querySelector(`.cell-${i}-${j}`)
                        elCurrCell.innerText = ''
                        elCurrCell.style.backgroundColor = 'rgb(229, 158, 202)'
                        board[i][j].isShown = false
                        gGame.isOnHint = false
                    }
                }
            }, 1000)

        }


    }
}




