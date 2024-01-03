const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const multer = require('multer');
const upload = multer();

app.use(express.static('dist'))

// const geoNamesApiUrl = "http://api.geonames.org/searchJSON"
// const geoNameUsername = process.env.GEO_NAMES_API_USERNAME
let latitude = null;
let longitude = null;
const weatherDataApiKey = process.env.WEATHER_DATA_API_KEY;
const weatherDataUrl = 'https://api.weatherbit.io/v2.0/current'


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// app.get('/getWeatherForecast', async (req, res) => {
//     try {
//         res.setHeader('Content-Type', 'application/json');
//         const getIt = await fetch(`${weatherDataUrl}/current?lat=${localStorage.getItem('latitude')}&lon=${localStorage.getItem('longitude')}&key=${weatherDataApiKey}`)
//         const response = await getIt.json()
//         console.log(response)
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//         console.log(error.message)
//     }
// })

app.get('/getWeatherForecast', async (req, res) => {
    try {
        // Extract parameters from the query string
        const { lat, lon } = req.query;
        console.log(`latitude: ${lat}`);
        console.log(`longitude: ${lon}`);

        // Modify or add new parameters
        const modifiedParams = {
            ...req.query,
            key: weatherDataApiKey
            // Add or modify parameters as needed
        };

        // Convert parameters back to a query string
        const queryString = new URLSearchParams(modifiedParams).toString();

        // Make a GET request to another API URL with modified parameters
        const apiUrl = `${weatherDataUrl}?${queryString}`;
        console.log(`API URL: ${apiUrl}`);
        // Actual API URL
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Send the response received from the API back to the client
        res.json(data);
    } catch (error) {
        //   res.status(500).json({ error: 'Internal Server Error' });
        console.log(error.message);
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});
