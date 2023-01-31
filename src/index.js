// Part 1

function displayDate(timestamp) {
  let now = new Date(timestamp);

  let date = now.getDate();
  // let hours = now.getHours();
  // let minutes = ("0" + now.getMinutes()).slice(-2);
  // let month = now.getMonth();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentMonth = months[now.getMonth()];
  let dateString = `${day}, ${date} ${currentMonth}, ${now.toLocaleString(
    "en-US",
    { hour: "numeric", minute: "numeric", hour12: true }
  )}`;

  return dateString;
}
displayDate(new Date());

// Part 2

function currentCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input");
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = citySearch.value;
  searchCity(citySearch.value);
}

let searchSection = document.querySelector("#searchForm");
searchSection.addEventListener("submit", currentCity);

// Part 3

function updateCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 28;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", updateCelsius);

function updateFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 82;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", updateFahrenheit);

// Weather API
function searchCity(city) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `
  <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-1">
            ${formatDay(forecastDay.time)}<br />
            <img
              src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" 
      alt="" width="42"
            <br />
            <span><strong>26°</strong></span>
            <br />
            <small
              ><strong
                >L: <span class="min-temp">${Math.round(
                  forecastDay.temperature.minimum
                )}°/span> H:
                <span class="max-temp">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span></strong
              ></small
            >
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Displaying Temperature

function getForecast(coordinates) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = response.data.name;

  let temperature = Math.round(response.data.temperature.current);
  celsiusTemperature = temperature;
  let mainTemp = document.querySelector("#temperature");

  let currentDate = document.querySelector(".date");
  currentDate.innerHTML = displayDate(new Date());

  let iconElement = document.querySelector("#icon");

  mainTemp.innerHTML = `${temperature}`;

  document.querySelector(".humidity-number").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#weather-desc").innerHTML =
    response.data.condition.description;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#sunrise-time").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset-time").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );

  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

// Geo Location

navigator.geolocation.getCurrentPosition(showPosition);

// Current Location

function showPosition(position) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-btn");
button.addEventListener("click", getCurrentLocation);

// Celcius & Farenheit

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);
