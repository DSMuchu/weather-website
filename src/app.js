const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'D.M.Suh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'D.M.Suh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help on 4 vulnerabilities in hbs issue',
        helpText: `These aren't vulnerabilities in the sense that you're going to get a virus on your machine. The package is safe to use and there are thousands of projects using these versions. These get pointed out and then fixed in new releases. It's all part of the development lifecycle.
                As an example, one of the high-risk issues is letting you know that your template could run code that the user provided if you don't correctly sanitize input. This is something you can address in your own project, and it's not an issue you'll run into with the code in the course.`,
        name: 'D.M.Suh'
    })
})

app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.send({
                error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
          if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
                        res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
           error: 'You must provide a search term'
       }) 
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'D.M.Suh',
            errorMessage: 'Help article not found.'
        })
})

app.get('*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'D.M.Suh',
            errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})