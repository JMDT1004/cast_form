var weatherKey = '6cca3bc02067fc41bf1f5065d94d97d4';

// Function to fetch weather data based on the city name
var getWeatherData = async (city) => {
  try {
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`);
    var data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Failed to fetch weather data');
  }
};

// Function to display the current weather conditions
var displayCurrentWeather = (data) => {
  var cityName = document.getElementById('city-name');
  var date = document.getElementById('date');
  var weatherIcon = document.getElementById('weather-icon');
  var temperature = document.getElementById('temperature');
  var humidity = document.getElementById('humidity');
  var windSpeed = document.getElementById('wind-speed');

  cityName.textContent = data.name;
  date.textContent = new Date().toLocaleDateString();
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  temperature.textContent = `Temperature: ${data.main.temp}°c`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/h`;
};

// Function to fetch the 5-day forecast for a city
var getForecastData = async (city) => {
  try {
    var response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherKey}&units=metric`);
    var data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Failed to fetch forecast data');
  }
};

// Function to display the 5-day forecast
var displayForecast = (data) => {
  var forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = '';

  for (var i = 0; i < data.list.length; i += 8) {
    var forecast = data.list[i];
    var forecastDate = new Date(forecast.dt_txt).toLocaleDateString();
    var weatherIcon = forecast.weather[0].icon;
    var temperature = forecast.main.temp;
    var windSpeed = forecast.wind.speed;
    var humidity = forecast.main.humidity;

    var forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast-card');
    forecastCard.innerHTML = `
      <div class="forecast-date">${forecastDate}</div>
      <img class="forecast-icon" src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
      <div class="forecast-temp">Temperature: ${temperature}°c</div>
      <div class="forecast-wind">Wind Speed: ${windSpeed} m/h</div>
      <div class="forecast-humidity">Humidity: ${humidity}%</div>
    `;

    forecastContainer.appendChild(forecastCard);
  }
};

// Function to handle the search button click event
var handleSearch = async () => {
  var cityInput = document.getElementById('city-input');
  var cityName = cityInput.value.trim();

  if (cityName !== '') {
    try {
      var weatherData = await getWeatherData(cityName);
      var forecastData = await getForecastData(cityName);

      displayCurrentWeather(weatherData);
      displayForecast(forecastData);

      // Add city to search history
      addToSearchHistory(cityName);
    } catch (error) {
      console.log('Error:', error);
    }
  }
};

// Function to add a city to the search history
var addToSearchHistory = (city) => {
  var historyContainer = document.getElementById('history');
  var historyItem = document.createElement('div');
  historyItem.classList.add('history-item');
  historyItem.textContent = city;
  historyItem.addEventListener('click', () => handleHistoryItemClick(city));

  historyContainer.appendChild(historyItem);
};

// Function to handle a click on a city in the search history
var handleHistoryItemClick = async (city) => {
  try {
    var weatherData = await getWeatherData(city);
    var forecastData = await getForecastData(city);

    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
  } catch (error) {
    console.log('Error:', error);
  }
};

// Attach event listener to the search button
var searchButton = document.getElementById('button');
searchButton.addEventListener('click', handleSearch);
