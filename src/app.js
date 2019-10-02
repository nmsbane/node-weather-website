const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geoCode = require('./utils/geoCode')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Awesome bane'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'bane is cool'      
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        msg: "this is a help page"
    })
})

app.get('/weather', (req, res) => {

    const { address } = req.query

    if(!address) {
        return res.send({
            error: "Address must be provided"
        })
    }

    geoCode(address, (err, data) => {

        if(err) {
            return res.send({
                error: "Could not get the coordinates"
            })
        }

        const { latitude, longitude, location } = data

        forecast(latitude, longitude, (err, forecastData) => {
            if(err) {
                return res.send({
                    error: "Could not get forecast for given latitude and longitudde"
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })

    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound.hbs', {
        title: '404',
        name: 'bane',
        msg: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound.hbs', {
        title: '404',
        name: 'bane',
        msg: 'my 404 page'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})