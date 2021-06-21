import { convertTemp, toTitleCase } from "./utilities.js";
class WeatherData {
    name;
    country;
    weatherDescrip;
    temp;
    feelsLike;
    humidity;
    windSpeed;
    constructor(name, country, weatherDescrip, temp, feelsLike, humidity, windSpeed) {
        this.name = name;
        this.country = country;
        this.weatherDescrip = weatherDescrip;
        this.temp = temp;
        this.feelsLike = feelsLike;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
}
const APIKey = '9d5fd1b567b7a91d0350699816be0b28';
const searchBar = document.querySelector('#location-search');
const unitToggle = document.getElementById('units-toggle');
const temp = document.getElementById('temperature');
const feels = document.getElementById('feels-like');
const currentLocation = document.getElementById('current-loc');
let units = 'F';
let data;
getWeatherData('San Diego');
searchBar.form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeatherData(getUserInput());
});
unitToggle.addEventListener('click', toggleUnits);
currentLocation.addEventListener('click', getTempHere);
function getTempHere() {
    let lat;
    let long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            lat = pos.coords.latitude;
            long = pos.coords.longitude;
            getWeatherData(lat, long);
        });
    }
}
function getUserInput() {
    const input = searchBar.value;
    searchBar.value = '';
    return input;
}
async function getWeatherData(latOrLoc, long) {
    let searchURL = new URL(`https://api.openweathermap.org/data/2.5/weather`);
    if (typeof latOrLoc === 'string') {
        searchURL.searchParams.append('q', latOrLoc);
    }
    else {
        searchURL.searchParams.append('lat', latOrLoc.toString());
        searchURL.searchParams.append('lon', long.toString());
    }
    searchURL.searchParams.append('appid', APIKey);
    searchURL.searchParams.append('units', 'imperial');
    console.log(searchURL.toString());
    try {
        let res = await fetch(searchURL.toString());
        res = await res.json();
        console.log(res);
        data = new WeatherData(res.name, res.sys.country, res.weather[0].description, res.main.temp, res.main.feels_like, res.main.humidity, res.wind.speed);
        displayData();
    }
    catch (err) {
        alert(err);
    }
}
function displayData() {
    const location = document.getElementById('location');
    const description = location.previousElementSibling;
    const humid = document.getElementById('humidity');
    const wind = humid.nextElementSibling;
    if (data.temp < 60) {
        console.log(data.temp);
        document.body.classList.add('cold');
    }
    else {
        document.body.className = '';
    }
    location.textContent = `${data.name}, ${data.country}`;
    description.textContent = toTitleCase(data.weatherDescrip);
    temp.innerHTML = `${convertTemp(data.temp, units)}<sup>&deg;${units}</sup>`;
    feels.innerHTML = `Feels like: ${convertTemp(data.feelsLike, units)}<sup>&deg;${units}</sup>`;
    humid.textContent = `Humidity: ${data.humidity}%`;
    wind.textContent = `Wind: ${data.windSpeed} MPH`;
}
function toggleUnits() {
    if (units === 'F') {
        units = 'C';
        unitToggle.nextElementSibling.textContent = 'Change to Fahrenheit';
    }
    else {
        units = 'F';
        unitToggle.nextElementSibling.textContent = 'Change to Celsius';
    }
    displayData();
}
