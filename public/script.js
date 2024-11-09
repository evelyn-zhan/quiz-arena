if(!localStorage.getItem('total-correct')) {
    localStorage.setItem('total-correct', 0)
}

if(!localStorage.getItem('total-incorrect')) {
    localStorage.setItem('total-incorrect', 0)
}

async function fetchCategory() {
    try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        return data
    } catch(err) {
        console.log(err)
    }
}

const categories = await fetchCategory()
const categoryField = document.getElementById('category')

for(let i = 0; i < categories.length; i++) {
    const { id, name } = categories[i]
    categoryField.innerHTML += `<option value="${id}" class="bg-white text-black">${name}</option>`
}

const playButton = document.getElementById('play-button')

playButton.addEventListener('click', (event) => {
    event.preventDefault()

    const numberOfQuestions = document.getElementById('number-of-questions').value || 5
    const category = document.getElementById('category').value || "9"

    if(!numberOfQuestions || numberOfQuestions < 5 || numberOfQuestions > 20) {
        alert('Number of questions must be around 5 to 20.')
        return
    }

    localStorage.setItem('numberOfQuestions', numberOfQuestions)
    localStorage.setItem('category', category)

    document.getElementById('number-of-questions').value = ''

    window.location.href = '/quiz'
})