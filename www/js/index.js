document.addEventListener('deviceready', function() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}, false);

function onSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById('location').innerText = `Lat: ${latitude}, Lon: ${longitude}`;
    getWeather(latitude, longitude);
}

function onError(error) {
    console.error('Error getting location: ' + error.message);
    document.getElementById('location').innerText = 'Unable to retrieve location';
}

function getWeather(lat, lon) {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Substitua pela sua chave da API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            document.getElementById('temperature').innerText = `Temperature: ${temperature} °C`;
            document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
        })
        .catch(err => {
            console.error('Error fetching weather data: ', err);
        });
}
