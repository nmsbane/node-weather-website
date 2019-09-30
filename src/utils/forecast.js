const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/98887f3a57cf2bfbbff4d378de016f38/' + latitude + ',' + longitude +'?units=si&lang=en'

    request({
        url,
        json: true // parse the response as json
    }, (err, response) => {
        if(err) {
            callback("unable to connect to weather service", undefined)
        } else if(response.body.error) {
            callback("unable to find location", undefined)
        }
        else {
            const currently = response.body.currently
            callback(undefined, response.body.daily.data[0].summary + "It is currently " + currently.temperature + " with a " + currently.precipProbability)
        }
    })
}

module.exports = forecast