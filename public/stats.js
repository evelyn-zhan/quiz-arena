const totalCorrect = parseInt(localStorage.getItem('total-correct'))
const totalIncorrect = parseInt(localStorage.getItem('total-incorrect'))

document.getElementById('total-correct').innerText = totalCorrect
document.getElementById('total-incorrect').innerText = totalIncorrect
document.getElementById('win-rate').innerText = `${Math.ceil((totalCorrect / (totalCorrect + totalIncorrect)) * 100)}%`