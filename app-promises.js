const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
    address: {
        describe: 'Address of your town',
        demand: true,
        alias: 'a',
        string: true
    }
}).help().alias('help', 'h').argv;
console.log("Fetching data for the following address");

var encodedAddress = encodeURIComponent(argv.address?argv.address:"Chennai");
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('The provided address doesn\'t exist');
    } else {
        console.log(response.data.results[0].formatted_address);
    }
    var weatherUrl = `https://api.darksky.net/forecast/22ff666984437ffe992b8e3ffb56c047/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}`
    return axios.get(weatherUrl);
}).then((response) => {
    if (response.error === 'The given location is invalid.') {
        throw new Error("Invalid Location");
    } else {
        console.log(`The temperature is ${response.data.currently.temperature}.Although,you will feel like ${response.data.currently.temperature}`);
    }
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to find the Forecast servers');
    }
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to find the google servers');
    }
});