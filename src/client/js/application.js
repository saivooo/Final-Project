const geoNamesApiUrl = "http://api.geonames.org/searchJSON"
let dataArray = []
let totalResultsCount = 0;

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
            console.log(data);
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
            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i].fclName != 'city, village,...') {
                    dataArray.splice(i, 1);
                }
            }
            totalResultsCount = dataArray.length;
            console.log(dataArray)
            console.log("---------------")
            console.log(`Total count of results: ${totalResultsCount}`)

            populateResultsTable();
        })
        .catch(error => {
            console.log(error)
        })

}

function populateResultsTable() {
    const resultsTableBody = document.getElementById('resultsTableBody');
    resultsTableBody.innerHTML = '';
    const propertiesToDisplay = ['city', 'state', 'countryName', 'latitude', 'longitude']
    dataArray.forEach(item => {
        const row = document.createElement('tr');

        propertiesToDisplay.forEach(property => {
            const cell = document.createElement('td');
            cell.textContent = item[property];
            row.appendChild(cell);
        });

        const radioBtnCell = document.createElement('td');
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.id = 'selectDestination';
        radioBtnCell.appendChild(radioBtn);
        row.appendChild(radioBtnCell);


        resultsTableBody.appendChild(row);
    });

    resultsTableBody.addEventListener('change', handleRowSelection);
}

const nextBtn = document.getElementById('acceptCitySelection');
nextBtn.addEventListener('click', getWeatherForCity);

let rowDataObject = null;

function handleRowSelection(event) {
    const selectedRow = event.target.closest('tr')
    if (selectedRow) {
        const rowData = Array.from(selectedRow.cells).slice(0, -1).map(cell => cell.textContent.trim());
        const propertyLabels = ['city', 'state', 'country', 'latitude', 'longitude'];

        rowDataObject = rowData.reduce((acc, value, index) => {
            const label = propertyLabels[index];
            if (label) {
                acc[label] = value;
            }
            return acc
        }, {});
        console.log('Row Data as Array of Objects with Custom Labels:', rowDataObject);
    } else {
        console.log('Please select a row');
    }
}

function getWeatherForCity() {
    const when = document.getElementById('when').value;
    const whenAsDate = new Date(when);

    console.log("User's Selected Date");
    console.log(whenAsDate);
    if (rowDataObject) {
        console.log("Your selected city: ", rowDataObject.city)
        console.log("Your selected state: ", rowDataObject.state)
    } else {
        console.log("Select a row")
    }
}

export { searchForCity };