// Constants
const apiKey = '8ac2631da3a38c3cbeb17bb521c0bdc0';
const submitBtn = document.getElementById('submitBtn');
const cityNameInput = document.getElementById('cityInput');
const weatherInfoDiv = document.querySelector('.weather-info');
const cityNameElement = document.getElementById('cityName');
const weatherIconElement = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weatherDescription');

// Event listener for the 'Get Weather' button click
submitBtn.addEventListener('click', () => {
    const cityName = cityNameInput.value;
    if (cityName.trim() === '') {
        alert('Please enter a valid city name.');
        return;
    }
    fetchWeatherData(cityName);
});

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

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
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    const iconCode = weather[0].icon;

    cityNameElement.textContent = name;
    weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="${weatherDescription}">`;
    temperatureElement.textContent = `${temperature}°C`;
    weatherDescriptionElement.textContent = weatherDescription;

    weatherInfoDiv.style.display = 'block';
}