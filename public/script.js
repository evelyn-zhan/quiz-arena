playButton = document.getElementById('play-button')

playButton.addEventListener('click', (event) => {
    event.preventDefault()

    numberOfQuestions = document.getElementById('number-of-questions').value

    if(!numberOfQuestions || numberOfQuestions < 5) {
        alert('Number of questions must be at least 5.')
        return
    }

    localStorage.setItem('numberOfQuestions', numberOfQuestions)

    document.getElementById('number-of-questions').value = ''

    window.location.href = '/quiz'
})