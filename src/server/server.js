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


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});
