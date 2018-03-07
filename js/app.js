document.getElementById("userButton").addEventListener('click', function (event) {
    const userInput = document.getElementById("userLocation").value;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInput}&key=AIzaSyCxf8TVkhDNTlfi7YjStp7etLanI4rVlKY`;
    getLocation(url);
})



const getLocation = (url) => {
    fetch(url)
        .then(function (response) {
            response.json().then(function (data) {
                const coordinates = data.results[0].geometry.location;
                const coordinatesLat = coordinates.lat;
                const coordinatesLng = coordinates.lng;
                const wUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c4d9a81218adf15a76b4861c56b81baf/${coordinatesLat},${coordinatesLng}`;
                getWeather(wUrl);
            })
        })
}

const getWeather = (wUrl) => {
    fetch(wUrl)
        .then(function (response) {
            response.json().then(function (data) {
                const dairyForcast = data.daily.data;
                dairyForcast.forEach(day => {
                    console.log(day);
                    let template = `
                    <h3>${unixDateToCurrentDate(day.time)}</h3>
                    <span>Icon: ${day.icon}</span>
                    <span>Temperature-high: ${day.temperatureHigh} and Temperature-min: ${day.temperatureMin}</span>
                    <span>Humidity: ${day.humidity}</span>
                    <span>UV index: ${day.uvIndex}</span>
                    <span>Wind: ${day.windSpeed}</span>
                    <span>Pressure: ${day.pressure}</span>`;
                    let container = document.getElementById('weather-container');
                    var newDiv = document.createElement("div");
                    container.append(newDiv);
                    console.log(template);
                });

            })
        })
}

const unixDateToCurrentDate = (unixNumber) => new Date(unixNumber * 1000).toLocaleString('en-us', {
    weekday: 'long'
});