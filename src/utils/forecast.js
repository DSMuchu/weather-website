const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a886099d6575db2af6cbf8d8b0084d4f/' + latitude + ',' + longitude + '?units=auto'

    request({url, json: true}, (error, {body} = {}) => {
            if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'The temperature today ranges from a high of ' + body.daily.data[0].temperatureHigh + ' to a low of ' + body.daily.data[0].temperatureLow + ' . It is currently ' + body.currently.temperature + ' degrees out. There is '+ body.currently.precipProbability  * 100  + ' % chance of rain.')
        }
    })
}

module.exports = forecast