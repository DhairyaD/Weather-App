const request = require('request')

const geocode = (location, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiZGhhaXJ5YWRhdmUyMSIsImEiOiJjazBuOWg4MW4wdnU5M2ZybXZndWw2c3FuIn0.C8aqhs1hw0uoGQeuvDIa4g&limit=1';

    request({url: url, json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services', undefined);
        }

        // if features array is empty then we got no search results
        else if (body.features.length === 0) {
            callback('Unable to find location the location. Try entering a different location', undefined);
        }

        else {

            // data object passed in to the callback
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }

    });
};

module.exports = geocode;
