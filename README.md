# Project Instructions
This project was given by Udacity as a final project, meant to give us a comprehensive challenge that'll put every skilled we learned during the course, plus more, to the test. This involved communicating with 3 apis, chaining their data together, to show the user a nice summary of where/when their next trip will be, what the weather will be like, and a preview of what it looks like there in the form of a picture.

To get started with this project, first, you should run `npm i` to install all packages.

Next, create an account with the following apis: Geonames(http://www.geonames.org/export/web-services.html); Weatherbit (https://www.weatherbit.io/account/create); Pixabay (https://pixabay.com/api/docs/) 

- Create a .env file and store your keys
- Your Geonames API username doesn't really need to be stored safely in my opinion. Just change the username on line 10 of application.js to your username (or don't, I don't care)
- In your.env file, assign your weathebit api key to `WEATHER_DATA_API_KEY`, and your Pixabay key to `PIXABAY_API_KEY`
- In your .gitignore file, add `.env` to it so that your license key isn't exposed when you fork to your own repo and make commits.
- run `npm run build-prod` followed by `npm run start` to run your project in prod mode locally on port 8081.
- In your browser, navigate to (http://localhost:8081/)
- Once the page loads, enter a city name, or abbreviation (ex. Atlanta, or ATL), select a date, then click submit
- Next, confirm your destination by clicking the radio button corresponding to your correct city
- click next, and that's it! You'll see your trip details.

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.
