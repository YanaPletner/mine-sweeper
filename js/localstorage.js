"use strict"

const players = document.querySelector('.players-container')
const input = document.querySelector('.txt-box')
var userNamesArr = localStorage.getItem('userNames') ? JSON.parse(localStorage.getItem('userNames')) : [];

userNamesArr.forEach(renderUserName)
function renderUserName(text) {
    players.innerHTML += `<p>${text}</p>`
}

function addUserName() {
    userNamesArr.push(input.value)
    localStorage.setItem('userNames', JSON.stringify(userNamesArr));
    renderUserName(input.value)
    input.value = ''
}
