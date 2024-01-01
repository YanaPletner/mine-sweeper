'use strict'

function negsCountForCell(rowIdx, colIdx, mat) {
    var neighborsCount = 0
    // console.log(rowIdx, colIdx)
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {

        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (j < 0 || j >= mat[i].length) continue

            if (i === rowIdx && j === colIdx) continue
            // console.log(i, j)
            if (mat[i][j] === MINE) neighborsCount++
        }
    }
    return neighborsCount
}


function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getClassName(position) {
    const cellClass = `cell-${position.i}-${position.j}`
    return cellClass
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


