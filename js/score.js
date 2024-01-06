"use strict"

const input = document.querySelector('.txt-box')
const players = document.querySelector('.players-container')
var userNamesArr = localStorage.getItem('userNames') ? JSON.parse(localStorage.getItem('userNames')) : []
var scoresArr = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : []

function updateScore() {
    var elTimer = document.querySelector('.timer')
    gBestScore = elTimer.innerText

    scoresArr.push(gBestScore)
    scoresArr.sort((p1, p2) => p1.localeCompare(p2))

    var heighestScore = document.querySelector('.heighst-score')
    heighestScore.innerText = scoresArr[0]

    localStorage.setItem('scores', JSON.stringify(scoresArr))
}


function getUserName() {
    for (var i = 0; i < userNamesArr.length; i++) {
        var currName = userNamesArr[i]
        renderUserName(currName)
    }
}


function renderUserName(text) {
    players.innerHTML += `<p>${text}</p>`
}


getUserName()
function addUserName() {
    userNamesArr.push(input.value)
    localStorage.setItem('userNames', JSON.stringify(userNamesArr))
    renderUserName(input.value)
    input.value = ''
}

