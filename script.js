// Constants
const apiKey = 'c9f776ecdd5d40fe47d40a76f25e51c1';
const submitBtn = document.getElementById('submitBtn');
const getCurrentLocationBtn = document.getElementById('getCurrentLocationBtn');
const cityNameInput = document.getElementById('cityInput');
const weatherInfoDiv = document.querySelector('.weather-info');
let isCurrentLocation = false; // Flag to track current location
let currentLocationName = ''; // Variable to store the name of the current location

// Elements to display weather data
const cityNameElement = document.getElementById('cityName');
const weatherIconElement = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weatherDescription');

// Event listener for the 'Get Weather for Current Location' button click
getCurrentLocationBtn.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    // Set the flag to true to track current location
    isCurrentLocation = true;

    // Get the user's current position
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeatherDataByCoordinates(latitude, longitude);
    }, (error) => {
      console.error('Error getting current location:', error.message);
      alert('Unable to get current location. Please try again or enter a city name.');
      // Reset the flag on error
      isCurrentLocation = false;
    });
  } else {
    alert('Geolocation is not supported by your browser. Please enter a city name.');
  }
});

// Event listener for the 'Get Weather' button click
submitBtn.addEventListener('click', () => {
  const cityName = cityNameInput.value;
  if (cityName.trim() === '') {
    alert('Please enter a valid city name.');
    return;
  }
  // Set the flag to false to indicate manual city input
  isCurrentLocation = false;
  fetchWeatherDataByCityName(cityName);
});

// Function to fetch weather data from OpenWeatherMap API based on coordinates
function fetchWeatherDataByCoordinates(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetchWeatherData(apiUrl);
}

// Function to fetch weather data from OpenWeatherMap API based on city name
function fetchWeatherDataByCityName(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetchWeatherData(apiUrl);
}

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(apiUrl) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found or API request failed.');
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error.message);
      alert('City not found or API request failed. Please try again.');
    });
}

// Function to display weather data on the page
function displayWeatherData(data) {
  const { name, main, weather } = data;
  const temperature = Math.floor(main.temp); // Round down the temperature to the nearest integer
  const weatherDescription = weather[0].description;
  const iconCode = weather[0].icon;

  // If weather data is fetched for current location, store the location name
  if (isCurrentLocation) {
    currentLocationName = name;
  }

  // Display the location name based on whether it's current location or a city name
  cityNameElement.textContent = isCurrentLocation ? currentLocationName : name;
  weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="${weatherDescription}">`;
  temperatureElement.textContent = `${temperature}°C`;
  weatherDescriptionElement.textContent = weatherDescription;

  weatherInfoDiv.style.display = 'block';
}
