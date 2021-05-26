const newYear = new Date(2022, 0, 1);
const newYearTime = newYear.getTime();

function countdown() {
    const currDate = new Date();
    const currTime = currDate.getTime();
    const timeDiff = Math.floor((newYearTime - currTime) / 1000);
    
    let seconds = timeDiff % 60;
    let minutes = Math.floor(timeDiff / 60) % 60;
    let hours = Math.floor(timeDiff / 3600) % 24;
    let days = Math.floor(timeDiff / 3600 / 24);
    
    document.getElementById('day').textContent = days;
    document.getElementById('hour').textContent = hours;
    document.getElementById('min').textContent = formatTime(minutes);
    document.getElementById('sec').textContent = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

setInterval(countdown, 1000);