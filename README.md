# Project Instructions
This project was given by Udacity as a way to practice various skills I've learned in the past chapter. These include writing apis, configuring and using webpack, body parsers, service workers, express, plugins, and more.

To get started with this project, first, you should make sure you're in the evaluate-news-nlp folder, and make sure you're on the branch named `NLP-Project`

Next, run `npm i` to install all packages.

This project used the MeaningCloud API, in order to use it, go [here](https://www.meaningcloud.com/developer/sentiment-analysis), create an account, and copy the license key they supply you with.
- Create a .env file and store your key in the variable `API_KEY` (this is what line 17 in your server index.js will refer to)
- In your .gitignore file, add `.env` to it so that your license key isn't exposed when you fork to your own repo and make commits.
- run `npm run build-prod` followed by `npm run start` to run your project in prod mode locally on port 8081.
- In your browser, navigate to (http://localhost:8081/)
- Once the page loads, enter a statement and click submit. Your input will be analyzed my meaningcloud api, and will display a few of the results from the analysis.
- *note that you won't be able to submit if the text box is empty. You'll get an alert.

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.
