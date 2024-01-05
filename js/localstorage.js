"use strict"

const input = document.querySelector('.txt-box')
const players = document.querySelector('.players-container')
var userNamesArr = localStorage.getItem('userNames') ? JSON.parse(localStorage.getItem('userNames')) : []

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
