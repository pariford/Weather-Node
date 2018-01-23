const request = require('request');

var geocodeAddress = (address, responseCallback) => {
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            return responseCallback('Unable to find the google servers');
        } else if (body.status === 'ZERO_RESULTS') {
            return responseCallback('The provided address doesn\'t exist');
        } else if (body.status === 'OK') {
            return responseCallback(undefined, {
                formatted_address: `${body.results[0].formatted_address}`,
                latitude: `${body.results[0].geometry.location.lat}`,
                longitude: `${body.results[0].geometry.location.lng}`
            });
        }
    });
}

module.exports = {
    geocodeAddress
};