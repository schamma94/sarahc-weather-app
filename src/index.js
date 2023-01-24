// Part 1

let now = new Date();

let currentDate = document.querySelector(".date");

let date = now.getDate();
let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
let month = now.getMonth();

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = timestamp.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}

// THIS DIDNT WORK ^^^^ TIME NOT CHANGING FOR EACH CITY

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

currentDate.innerHTML = `${day}, ${date} ${currentMonth}, ${now.toLocaleString(
  "en-US",
  { hour: "numeric", minute: "numeric", hour12: true }
)}`;

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
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");

  // let dateElement = document.querySelector("date");

  // let windElement = document.querySelector("#wind-speed");
  // let sunriseElement = document.querySelector("#sunrise-time");
  // let sunsetElement = document.querySelector("#sunset-time");
  let iconElement = document.querySelector("#icon");

  mainTemp.innerHTML = `${temperature}`;

  document.querySelector(".humidity-number").innerHTML =
    response.data.main.humidity;
  document.querySelector("#weather-name").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  document.querySelector("#sunrise-time").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset-time").innerHTML = response.data.sys.sunset;

  // sunriseElement.innerHTML = response.data.sys.sunrise;
  // sunsetElement.innerHTML = response.data.sys.sunset;
  // windElement.innerHTML = Math.round(response.data.wind.speed);
  // dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// Geo Location

navigator.geolocation.getCurrentPosition(showPosition);

// Current Location

function showPosition(position) {
  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-btn");
button.addEventListener("click", getCurrentLocation);
