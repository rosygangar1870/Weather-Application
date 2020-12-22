const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=292e3277abfc88ec71cd3ab4e3f0355b&query=' + latitude +',' + longitude + '&units=m'
    
    request({url, json: true}, (error, { body }) => {

        if(error) {
            callback('Unable to connect with the weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +". It is currently "+body.current.temperature+" dregrees out. It feels like "+body.current.feelslike
            +" degrees out.")
        }
    })
}

module.exports = forecast