const btnCalculate = document.getElementById('btn-calculate')
const btnClose = document.getElementById('btn-close')
const weight = document.getElementById('weight')
const height = document.getElementById('height')
const errorWeight = document.querySelector('#weight + span.error')
const errorHeight = document.querySelector('#height + span.error')
const resultPopUp = document.getElementById('result-container')
const score = document.getElementById('score')
const categories = document.getElementById('categories')

btnCalculate.disabled = true

const btnDisabled = () => {
    if (weight.value.length === 0 || height.value.length === 0 || weight.value == 0 || height.value == 0){
        btnCalculate.disabled = true
    } else {
        btnCalculate.disabled = false
    }
}

weight.addEventListener('input', () => {
    if (weight.validity.valid){
        errorWeight.textContent = ''
        weight.className = ''
    } else if (weight.validity.valueMissing){
        errorWeight.textContent = 'You need to input your weight.'
        weight.className = 'input invalid'
    } else if (weight.validity.rangeUnderflow) {
        errorWeight.textContent = 'Please input numbers greater than zero.'
        weight.className = 'input invalid'
    }
    btnDisabled()
})

height.addEventListener('input', () => {
    if (height.validity.valid){
        errorHeight.textContent = ''
        height.className = ''
    } else if (height.validity.valueMissing){
        errorHeight.textContent = 'You need to input your height.'
        height.className = 'input invalid'
    } else if (height.validity.rangeUnderflow) {
        errorHeight.textContent = 'Please input numbers greater than zero.'
        height.className = 'input invalid'
    }
    btnDisabled()
})

const bmiScore = (weight, height) => {
    return (weight/Math.pow(height/100, 2)).toFixed(1)
}

const bmiCategories = (x) => {
   if (x < 18.5) return 'Underweight'
   else if (x >= 18.5 && x <= 24.9) return 'Normal'
   else if (x >= 25 && x <= 29.9) return 'Overweight'
   else if (x >= 30) return 'Obesity'
   else return 'Invalid'
}

const submit = (event) => {
    event.preventDefault()
    resultPopUp.style.visibility = 'visible'

    const scoreResult = bmiScore(parseFloat(weight.value), parseFloat(height.value))

    score.textContent = scoreResult

    categories.textContent = bmiCategories(scoreResult)
}


btnCalculate.addEventListener('click', submit)


btnClose.addEventListener('click', (event) => {
    event.preventDefault()
    resultPopUp.style.visibility = 'hidden'
})