const geoNamesApiUrl = "http://api.geonames.org/searchJSON"

function handleSubmit(event) {
    event.preventDefault();
    const where = document.getElementById('where').value

    fetch(`${geoNamesApiUrl}?q=${where}&maxRows=10&username=Saivooo`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error)
        })

}

export { handleSubmit };