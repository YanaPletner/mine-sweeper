'use strict'

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


function startTimer() {
    var startTime = Date.now()
    var elTimer = document.querySelector('.timer')

    gTimeInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const formattedTime = (elapsedTime / 1000).toFixed(3)
        elTimer.textContent = formattedTime
    }, 37)
}