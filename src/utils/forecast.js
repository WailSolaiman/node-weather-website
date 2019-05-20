const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6417b24deda7979f92f410a54d08fd27/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        //const {body} = response

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find the location!', undefined)
        }
        else {
            const summary = body.daily.data[0].summary
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            callback(undefined, {
                summary,
                temperature,
                precipProbability
            })
        }
    })
}

module.exports = forecast