import { convertTemp, toTitleCase } from "./utilities.js";

class WeatherData {
    constructor(
        readonly name: string,
        readonly country: string,
        readonly weatherDescrip: string,
        readonly temp: number,
        readonly feelsLike: number,
        readonly humidity: number,
        readonly windSpeed: number
    ) {}
}


const APIKey = '9d5fd1b567b7a91d0350699816be0b28';
const searchBar = document.querySelector('#location-search') as HTMLInputElement;
const unitToggle = document.getElementById('units-toggle')! as HTMLInputElement;
const temp = document.getElementById('temperature')!;
const feels = document.getElementById('feels-like')!;
let units: 'F' | 'C' = 'F';
let data: WeatherData;


getWeatherData('San Diego');
searchBar.form!.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    getWeatherData(getUserInput());
})
unitToggle.addEventListener('click', toggleUnits);




function getUserInput() {
    const input = searchBar.value.replace(/\s/g, '+');
    searchBar.value = '';
    return input;
}

function getWeatherData(location: string) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=imperial`)
    .then(res => res.json())
    .then(res => {
        data = new WeatherData(
            res.name,
            res.sys.country,
            res.weather[0].description,
            res.main.temp,
            res.main.feels_like,
            res.main.humidity,
            res.wind.speed
        )

        displayData();
    })
    .catch(alert);
}

function displayData() {
    const location = document.getElementById('location')!;
    const description = location.previousElementSibling!;
    const humid = document.getElementById('humidity')!;
    const wind = humid.nextElementSibling!;

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
        unitToggle.nextElementSibling!.textContent = 'Change to Fahrenheit';
    } else {
        units = 'F';
        unitToggle.nextElementSibling!.textContent = 'Change to Celsius';
    }
    displayData();
}