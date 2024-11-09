document.getElementById('quiz-container').style.display = 'none'
document.getElementById('quiz-end-container').style.display = 'none'

const countdownText = [ '3', '2', '1', 'Ready?', 'Quiz Time!' ]
const countdown = document.getElementById('countdown')
let index = 0

const countdownInterval = setInterval(() => {
    countdown.innerText = countdownText[index]
    countdown.classList.add('scale-75')
    setTimeout(() => {
        countdown.classList.remove('scale-75')
    }, 700)

    index++

    if(index == countdownText.length) {
        clearInterval(countdownInterval)
        setTimeout(() => {
            countdown.remove()
            document.getElementById('countdown-container').remove()
        }, 1500)
    }
}, 1500)

async function getData(numberOfQuestions, category) {
    try {
        const res = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=easy&type=multiple`)
        const data = await res.json()
        return data.results
    } catch(error) {
        console.log(error)
        return []
    }
}

setTimeout(() => {
    startQuiz()
}, 9500);

async function startQuiz() {
    const numberOfQuestions = localStorage.getItem('numberOfQuestions')
    const category = localStorage.getItem('category')
    const questions = await getData(numberOfQuestions, category)
    
    document.getElementById('quiz-container').style.display = ''
    const questionNumber = document.getElementById('question-number')
    const question = document.getElementById('question')
    const optionA = document.getElementById('option-a')
    const optionB = document.getElementById('option-b')
    const optionC = document.getElementById('option-c')
    const optionD = document.getElementById('option-d')

    let correct = 0, incorrect = 0
    
    const showQuestion = (index) => {
        questionNumber.innerText = `Question ${index + 1} of ${questions.length}`
        question.innerText = questions[index].question
    
        let option = []
        option.push(questions[index].correct_answer)
        option.push(...questions[index].incorrect_answers)
        option = option.sort()
    
        optionA.innerText = `A. ${option[0]}`
        optionB.innerText = `B. ${option[1]}`
        optionC.innerText = `C. ${option[2]}`
        optionD.innerText = `D. ${option[3]}`
    }

    const timer = document.getElementById('timer')
    let time = 60

    const quizTimer = setInterval(() => {
        time -= 1
        timer.innerText = time
    
        if(time == 0) {
            clearInterval(quizTimer)
            stopQuiz("Time's Up")
        }
    }, 1000);
    
    let questionIndex = 0
    showQuestion(questionIndex)
    
    function onAnswerHandler() {
        questionIndex += 1
        if(questionIndex < questions.length) {
            showQuestion(questionIndex)
        } else {
            clearInterval(quizTimer)
            stopQuiz('You have completed the quiz!')
        }
        return
    }

    function stopQuiz(message) {
        document.getElementById('quiz-container').style.display = 'none'
        document.getElementById('quiz-end-container').style.display = ''
        const quizEndMessage = document.getElementById('quiz-end-message')
        
        quizEndMessage.innerText = message
        quizEndMessage.classList.add('scale-75')
        setTimeout(() => {
            quizEndMessage.classList.remove('scale-75')
        }, 700)

        localStorage.setItem('correct', correct)
        localStorage.setItem('incorrect', incorrect)
        localStorage.setItem('time', time)
        localStorage.setItem('not-answered', questions.length - (correct + incorrect))

        const totalCorrect = localStorage.getItem('total-correct')
        localStorage.setItem('total-correct', parseInt(totalCorrect) + parseInt(correct))

        const totalIncorrect = localStorage.getItem('total-incorrect')
        localStorage.setItem('total-incorrect', parseInt(totalIncorrect) + parseInt(incorrect))

        setTimeout(() => {
            window.location.href = '/result'
        }, 2000)
    }
    
    optionA.addEventListener('click', () => {
        if(optionA.innerText.slice(3) == questions[questionIndex].correct_answer) {
            correct += 1
        } else {
            incorrect += 1
        }
        onAnswerHandler()
    })

    optionB.addEventListener('click', () => {
        if(optionB.innerText.slice(3) == questions[questionIndex].correct_answer) {
            correct += 1
        } else {
            incorrect += 1
        }
        onAnswerHandler()
    })

    optionC.addEventListener('click', () => {
        if(optionC.innerText.slice(3) == questions[questionIndex].correct_answer) {
            correct += 1
        } else {
            incorrect += 1
        }
        onAnswerHandler()
    })

    optionD.addEventListener('click', () => {
        if(optionD.innerText.slice(3) == questions[questionIndex].correct_answer) {
            correct += 1
        } else {
            incorrect += 1
        }
        onAnswerHandler()
    })
}
