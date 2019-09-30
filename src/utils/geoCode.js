const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm1zYmFuZSIsImEiOiJjazB3cGlqbWIxODZkM2NwYzI3eXRmM2x2In0.cm8wJQc_IvJuzTYLRAzSaQ'
    request({
        url: url,
        json: true
    }, (err, response) => {
        if(err) {
            callback("unable to connect to location services", undefined)
        } else if (response.body.features.length == 0) {
            console.log(response.body)
            callback("unable to location. Try another search", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
