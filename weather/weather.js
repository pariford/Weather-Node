const request = require('request');

var currentWeather = (position, responseCallBack) => {
    request({
        url: `https://api.darksky.net/forecast/22ff666984437ffe992b8e3ffb56c047/${position.latitude},${position.longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            return responseCallBack("Unable to connect to Forecast servers");
        } else if (body.error === 'The given location is invalid.') {
            return responseCallBack("Invalid Location");
        } else
            return responseCallBack(undefined, {
                current_temperature: `${body.currently.temperature}`,
                current_summary:`${body.currently.summary}`,
                apparent_temperature:`${body.currently.apparentTemperature}`
            })
    });
};

module.exports = {
    currentWeather
}