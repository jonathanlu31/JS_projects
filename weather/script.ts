const APIKey = '9d5fd1b567b7a91d0350699816be0b28';
const searchBar = document.querySelector('#location-search')! as HTMLInputElement;
const temp = document.getElementById('temperature')!;
const feels = document.getElementById('feels-like')!;
let units: 'F' | 'C' = 'F';

getWeatherData('San Diego');
document.forms[0].addEventListener('submit', e => {
    e.preventDefault();
    getWeatherData(getUserInput());
})

function getUserInput() {
    const input = searchBar.value.replace(/\s/g, '+');
    searchBar.value = '';
    return input;
}

function getWeatherData(location: string) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=imperial`)
    .then(res => res.json())
    .then(displayData)
    .catch(alert);
}

function displayData(data: object) {
    const location = document.getElementById('location')!;
    const description = location.previousElementSibling!;
    const humid = document.getElementById('humidity')!;
    const wind = humid.nextElementSibling!;

    location.textContent = data.name;
    description.textContent = data.weather[0].description;
    temp.innerHTML = `${convertTemp(data.main.temp, units)}<sup>${units}</sup>`;
    feels.innerHTML = `Feels like: ${convertTemp(data.main.feels_like, units)}<sup>${units}</sup>`;
    humid.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed} MPH`;
}

function convertTemp(temp: number, units: 'F' | 'C') {
    if (units === 'F') {
        return temp;
    }
}