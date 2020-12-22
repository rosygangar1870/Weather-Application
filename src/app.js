const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
//this allows you to set values for a given express setting 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))//customize your server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rosy Gangar'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rosy Gangar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Temperature provided is in Celsius.',
        title: 'Help',
        name: 'Rosy Gangar'
    })
})



app.get(('/weather'),(req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error : error})
        }
        
         forecast(latitude, longitude, (error, forecastData) => {
             if(error) {
                 return res.send({error : error})
             }

             res.send({
                 forecast:forecastData,
                 location,
                 address: req.query.address
             })
         })

    })

    /*
    res.send({
        forecast: 'It is snowing',
        location: 'Philadephia',
        address: req.query.address
    })*/
})

app.get('/products',(req, res) => {
    if(!req.query.search) {
        return res.send ({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Rosy Gangar',
        errorMessage: 'Help article not found.'
    })
})//This is going to match that has'nt been matched so far that starts with forward slash help forward slash


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rosy Gangar',
        errorMessage: 'Page not found.'
    })
})//* match anything that hasnt been matched so far

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})









