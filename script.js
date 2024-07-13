const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

// Adding event listener for key press of Enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeatherReport(searchInputBox.value);
    }
})

// Get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(response => response.json())
        .then(weather => showWeatherReport(weather));
}

// Show weather report
function showWeatherReport(weather) {
    let city_code = weather.cod;
    if (city_code === 400) {
        swal("Empty Input", "Please enter any city", "error");
        reset();
    } else if (city_code === 404) {
        swal("Bad Input", "Entered city didn't match", "warning");
        reset();
    } else {
        let weather_body = document.getElementById('weather-body');
        weather_body.style.display = 'block';
        let todayDate = new Date();
        weather_body.innerHTML = `
            <div class="location-deatils">
                <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
                <div class="date" id="date">${dateManage(todayDate)}</div>
            </div>
            <div class="weather-status">
                <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C</div>
                <div class="weather" id="weather">${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
                <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)</div>
                <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
            </div>
            <hr>
            <div class="day-details">
                <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%<br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
            </div>
        `;
        changeBg(weather.weather[0].main);
        reset();
    }
}

// Get current time
function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

// Manage current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

// Change background image according to weather status
function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(clouds.jpg)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(rain.jpg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(clear_sky.jpg)';
    } else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(snow.jpg)';
    } else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(sunny.jpg)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(thunderstrom.jpg)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(thunderstrom.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(mist.jpg)';
    } else {
        document.body.style.backgroundImage = 'url(background.jpg)';
    }
}

// Get class name for weather icon
function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// Add zero if hour or minute is less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
