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
const weatherDataUrl = 'https://api.weatherbit.io/v2.0/forecast/daily'

const pixabayApiKey = process.env.PIXABAY_API_KEY;
const pixabayApiUrl = 'https://pixabay.com/api/'

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.get('/getWeatherForecast', async (req, res) => {
    try {
        // Extract parameters from the query string
        const { lat, lon, units } = req.query;

        // Modify or add new parameters
        const modifiedParams = {
            ...req.query,
            key: weatherDataApiKey
        };

        // Convert parameters back to a query string
        const queryString = new URLSearchParams(modifiedParams).toString();

        // Make a GET request to another API URL with modified parameters
        const apiUrl = `${weatherDataUrl}?${queryString}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        //   res.status(500).json({ error: 'Internal Server Error' });
        console.log(error.message);
    }
});

app.get('/getPixabayPic', async (req, res) => {
    try {
        const { q, page, per_page } = req.query;

        const modifiedParams = {
            ...req.query,
            key: pixabayApiKey
        };

        const queryString = new URLSearchParams(modifiedParams).toString();

        const apiUrl = `${pixabayApiUrl}?${queryString}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.log(error.message);
    }
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});
