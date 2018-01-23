const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
    address: {
        describe: 'Address of your town',
        demand: true,
        alias: 'a',
        string: true
    }
}).help().alias('help', 'h').argv;
console.log("Fetching data");
geocode.geocodeAddress(argv.address, (error, response) => {
    if (error) {
        console.log(error);
    } else {
        //console.log(JSON.stringify(response, undefined, 2));
        console.log(`You are searching weather for location: ${response.formatted_address}`);
        weather.currentWeather(response, (error, callbackResponse) => {
            if (error) {
                console.log(error);
            } else {
                //console.log(JSON.stringify(callbackResponse, undefined, 2));
                console.log(`There the current temperature is ${callbackResponse.current_temperature}F.Although it will feel like ${callbackResponse.apparent_temperature}F`);
            }
        });
    }
});