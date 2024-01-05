const geoNamesApiUrl = "http://api.geonames.org/searchJSON"
let dataArray = []
let totalResultsCount = 0;
let date;

function searchForCity(event) {
    event.preventDefault();
    const where = document.getElementById('where').value;

    fetch(`${geoNamesApiUrl}?name_equals=${where}&username=Saivooo`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //use map function to extract certain properties from api response data
            dataArray = data.geonames.map(item => {
                return {
                    city: item.toponymName,
                    state: item.adminName1,
                    countryAbbrv: item.countryCode,
                    countryName: item.countryName,
                    fclName: item.fclName,
                    latitude: item.lat,
                    longitude: item.lng
                }
            });

            //remove indexes in the response array if they're not a city
            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i].fclName != 'city, village,...') {
                    dataArray.splice(i, 1);
                }
            }

            if (dataArray.length > 5) {
                dataArray.splice(5);
            }

            //update total count after removal of unwanted indexes 
            totalResultsCount = dataArray.length;
            populateResultsTable();
        })
        .catch(error => {
            console.log(error)
        })

}

//function to update html to create a table where user will select the correct city
function populateResultsTable() {
    //show the HTML section that has the prompt to select the correct city
    const cityResultsSection = document.getElementById('cityResults');
    cityResultsSection.classList.remove('hide');

    const resultsTableBody = document.getElementById('resultsTableBody');
    resultsTableBody.innerHTML = '';
    const propertiesToDisplay = ['city', 'state', 'countryName', 'latitude', 'longitude']

    //iterate through array that was created in searchForCity
    dataArray.forEach(item => {
        const row = document.createElement('tr');

        //append the property to it's corresponding cell in the row
        propertiesToDisplay.forEach(property => {
            const cell = document.createElement('td');
            cell.textContent = item[property];
            row.appendChild(cell);
        });

        //add a radio button so user can select the correct city
        const radioBtnCell = document.createElement('td');
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.id = 'selectDestination';

        //append radio button to the cell and append cell to the row
        radioBtnCell.appendChild(radioBtn);
        row.appendChild(radioBtnCell);

        //append row to the results table in the UI
        resultsTableBody.appendChild(row);
    });

    //when user changes selection, trigger handleRowSelection
    resultsTableBody.addEventListener('change', handleRowSelection);
    //once user clicks next button, it will trigger getWeatherForCity, which will call another api to return the temp in the selected city
    const nextBtn = document.getElementById('acceptCitySelection');
    nextBtn.addEventListener('click', getWeatherForCity);
}


let rowDataObject;

//fucntion that defines rowDataObject as the selected row
function handleRowSelection(event) {
    //declare selected row
    const selectedRow = event.target.closest('tr')

    if (selectedRow) {
        const rowData = Array.from(selectedRow.cells).slice(0, -1).map(cell => cell.textContent.trim());
        const propertyLabels = ['city', 'state', 'countryName', 'latitude', 'longitude'];

        rowDataObject = rowData.reduce((acc, value, index) => {
            const label = propertyLabels[index];
            if (label) {
                acc[label] = value;
            }
            return acc;
        }, {});
    } else {
        console.log('Please select a row');
    }
}

let weatherArray = [];
let minTempCount = null;
let maxTempCount = null;

//function to call api that gets weather based on latitude & longitude
function getWeatherForCity() {
    const cityResultsSection = document.getElementById('cityResults');
    cityResultsSection.classList.add('hide');

    const when = document.getElementById('when').value;
    date = new Date(when);

    console.log("User's Selected Date");
    console.log(date);
    if (rowDataObject) {
        //add details to the LS for later use
        localStorage.setItem('city', rowDataObject.city);
        localStorage.setItem('state', rowDataObject.state);
        localStorage.setItem('country', rowDataObject.countryName);
        localStorage.setItem('latitude', rowDataObject.latitude);
        localStorage.setItem('longitude', rowDataObject.longitude);
        localStorage.setItem('departureDate', date);
    } else {
        console.log("Select a row")
    }

    fetch(`/getWeatherForecast?lat=${rowDataObject.latitude}&lon=${rowDataObject.longitude}&units=I`, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //map the min and max temps received from api to weatherArray
            weatherArray = data.data.map(item => {
                return {
                    maxTemp: item.max_temp,
                    minTemp: item.min_temp
                }
            })
            //Addup and average the min & max temps
            weatherArray.forEach(x => {
                maxTempCount += x.maxTemp
                minTempCount += x.minTemp
            })
            const avgMaxTemp = (maxTempCount / weatherArray.length);
            const avgMinTemp = (minTempCount / weatherArray.length);
            //add min & max temps to LS for later use
            localStorage.setItem('avgMaxTemp', avgMaxTemp)
            localStorage.setItem('avgMinTemp', avgMinTemp)

        })
        .catch(error => {
            console.error(error)
        });

    pixabayPic();
}

function pixabayPic() {
    fetch(`/getPixabayPic?q=${localStorage.getItem('city')} ${localStorage.getItem('state')} ${localStorage.getItem('country')}&page=1&per_page=3`, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('-------------------------------');
            console.log(data.hits[0]);
            localStorage.setItem('imageUrl', data.hits[0].webformatURL)
            console.log('-------------------------------');

            createNewTravelCard();
        })
        .catch(error => {
            console.error(error)
        });
}

function createNewTravelCard() {
    const cardsDiv = document.getElementById('cardsDiv');
    const newCardDiv = document.createElement('div');
    newCardDiv.classList.add('newCardDiv');

    //image tag to store 
    const image = document.createElement('img');
    image.classList.add('imageForDiv');
    image.src = localStorage.getItem('imageUrl');
    image.alt = `${localStorage.getItem('city')}, ${localStorage.getItem('state')}, ${localStorage.getItem('country')}`;
    newCardDiv.appendChild(image);

    //div to store trip details + save/remove buttons
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('detailsDiv');

    const where = document.createElement('p');
    where.classList.add('detailsPTag');
    where.textContent = `My trip to: ${localStorage.getItem('city')}, ${localStorage.getItem('state')}, ${localStorage.getItem('country')}`
    detailsDiv.appendChild(where);
    const when = document.createElement('p');
    when.classList.add('detailsPTag');
    when.textContent = `Departing: ${formatDate(date)}`;
    detailsDiv.appendChild(when);

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('saveTrip');
    saveBtn.textContent = 'save trip';
    detailsDiv.appendChild(saveBtn);
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeTrip');
    removeBtn.textContent = 'remove trip';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.appendChild(saveBtn);
    buttonsDiv.appendChild(removeBtn);
    detailsDiv.appendChild(buttonsDiv);

    newCardDiv.appendChild(detailsDiv);

    //div to store weather details
    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weatherDiv');
    const weatherHead = document.createElement('p');
    weatherHead.classList.add('detailsPTag');
    weatherHead.textContent = `Average weather during this time is:`;
    weatherDiv.appendChild(weatherHead);
    const avgTemps = document.createElement('p');
    avgTemps.classList.add('detailsPTag');
    avgTemps.textContent = `High: ${parseInt(localStorage.getItem('avgMaxTemp'))}° F Low: ${parseInt(localStorage.getItem('avgMinTemp'))}° F`;
    weatherDiv.appendChild(avgTemps);

    newCardDiv.appendChild(weatherDiv);

    cardsDiv.appendChild(newCardDiv);
    document.getElementById('cardsDiv').classList.remove('hide')
}

function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export { searchForCity };