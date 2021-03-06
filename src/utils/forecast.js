const request = require('request');

const forecast = (latitude, longitude, callback) => {

    // url with custom latitude and longitude
    const url = 'https://api.darksky.net/forecast/8bb0cf41cc820fbea7f5d6cdff6f6a0c/' + latitude + ',' + longitude;

    request({ url, json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather services', undefined);
        }

        // same as response.body.error
        else if (body.error) {
            callback('Unable to find a location. Try again.', undefined)
        }

        else {

          // conversion to celsius
          const tempInCelsius = (body.currently.temperature - 32) * (5/9);
          const dailyHigh = (body.daily.data[0].temperatureHigh - 32) * (5/9);
          const dailyLow = (body.daily.data[0].temperatureLow - 32) * (5/9);

          callback(undefined, body.daily.data[0].summary + " It is currently " + tempInCelsius.toFixed(2) + " degrees Celsius. There is a " + body.currently.precipProbability + "% of rain. The daily high temperature is " + dailyHigh.toFixed(2) + " degrees and the daily low temperature is " + dailyLow.toFixed(2) + " degrees. Weekly forecast: " + body.daily.summary);

        }
    });

};

module.exports = forecast;
