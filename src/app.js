const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Wail Solaiman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Wail Solaiman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Wail Solaiman'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wail Solaiman',
        errorMsg: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query

    if (!address) {
        return res.send({
            error: 'Please provide an address to get weather informations'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        //const {latitude, longitude, location} = data

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            
            forecastData['location'] = location
            res.send([{
                forecast: forecastData,
                address
            }])
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wail Solaiman',
        errorMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})