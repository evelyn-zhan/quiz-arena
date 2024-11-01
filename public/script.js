playButton = document.getElementById('play-button')

playButton.addEventListener('click', (event) => {
    event.preventDefault()

    numberOfQuestions = document.getElementById('number-of-questions').value

    if(!numberOfQuestions || numberOfQuestions < 5 || numberOfQuestions > 20) {
        alert('Number of questions must be around 5 to 20.')
        return
    }

    localStorage.setItem('numberOfQuestions', numberOfQuestions)

    document.getElementById('number-of-questions').value = ''

    window.location.href = '/quiz'
})