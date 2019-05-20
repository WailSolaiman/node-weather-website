console.log('Weather app - Javascript file from client side')

const searchWeather = (location) => {
    fetch('http://localhost:3000/weather?address=' + location)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                const {location, precipProbability, summary, temperature} = data[0].forecast
                messageOne.textContent = location
                messageTwo.textContent = 'It is currently ' + temperature + ' degress. ' + summary + ' There is a ' + precipProbability + '% chance of rain.'
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    searchWeather(location)
})