const correct = localStorage.getItem('correct')
const incorrect = localStorage.getItem('incorrect')
const notAnswered = localStorage.getItem('not-answered')
const time = localStorage.getItem('time')

document.getElementById('correct').innerText = correct
document.getElementById('incorrect').innerText = incorrect
document.getElementById('not-answered').innerText = notAnswered
document.getElementById('time').innerText = `${time} seconds`