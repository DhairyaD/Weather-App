const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocoding');
const forecast = require('./utils/forecast');
const app = express();

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials/');

// setup handlebars engine
app.set('view engine', 'hbs');
// pointing to the templates directory which has the views
app.set('views', viewsPath);
// path to directory where all the partials are
hbs.registerPartials(partialsPath);


// static directory to serve
app.use(express.static(publicDirPath));

// home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dhairya Dave'
    });
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dhairya Dave'
    });
});

// about page
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a message',
        name: 'Dhairya Dave',
        title: 'Help'
    });
});

// weather page
app.get('/weather', (req, res) => {

    // if there is no address in the query string
    if (!req.query.address) {
        return res.send({
            error: 'provide an address to obtain weather'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
            if (error){
                return res.send({error});
            }

            forecast(latitude, longitude, (error, forecastData) => {
                // if there is no forecastData
                if (error) {
                    return res.send({error});
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
    });
});

app.get('/products', (req, res) => {
    // when the search query string is NOT provided
    if (!req.query.search) {
        return res.send({
            error: 'provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

// matching anything after help/ route, do the following.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhairya Dave',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dhairy Dave',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
