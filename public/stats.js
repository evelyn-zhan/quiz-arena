const totalCorrect = parseInt(localStorage.getItem('total-correct'))
const totalIncorrect = parseInt(localStorage.getItem('total-incorrect'))

document.getElementById('total-correct').innerText = totalCorrect
document.getElementById('total-incorrect').innerText = totalIncorrect

let winRate = 0

if(totalCorrect + totalIncorrect > 0) {
    winRate = Math.ceil((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
}

document.getElementById('win-rate').innerText = `${winRate}%`