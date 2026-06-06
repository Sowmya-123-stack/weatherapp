// OpenWeatherMap API Keys and Configuration
const API_KEY = '0e0e28bfcea224d2da51cb465b2d7b80';
const USE_DUMMY_API = true; // Set to true to use dummy/mock API
const USE_DEMO_MODE = false;

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const AIR_QUALITY_API_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/reverse';

// DOM Elements
const loadingScreen = document.getElementById('loading');
const contentDiv = document.getElementById('content');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const background = document.getElementById('background');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const forecastGrid = document.getElementById('forecastGrid');
const airQualityGrid = document.getElementById('airQualityGrid');

// Weather Icon Mapping
const weatherIconMap = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain',
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain',
    '10n': 'fas fa-cloud-moon-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog'
};

// Weather Background Map
const weatherBackgroundMap = {
    'clear': 'clear',
    'clouds': 'clouds',
    'rain': 'rain',
    'drizzle': 'rain',
    'thunderstorm': 'thunderstorm',
    'snow': 'snow',
    'mist': 'mist',
    'smoke': 'mist',
    'haze': 'mist',
    'dust': 'mist',
    'fog': 'mist',
    'sand': 'mist',
    'ash': 'mist',
    'squall': 'rain',
    'tornado': 'thunderstorm'
};

function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = ((hash << 5) - hash) + value.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function getCityCoordinates(city) {
    const hash = hashString(city.toLowerCase());
    const lat = ((hash % 180) - 90) + (hash % 10) / 10;
    const lon = ((Math.floor(hash / 100) % 360) - 180) + (hash % 10) / 10;
    return { lat, lon };
}

function pickWeatherPattern(city) {
    const patterns = [
        { main: 'Clear', description: 'clear sky', icon: '01d' },
        { main: 'Clouds', description: 'partly cloudy', icon: '02d' },
        { main: 'Clouds', description: 'overcast clouds', icon: '04d' },
        { main: 'Rain', description: 'light rain', icon: '10d' },
        { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
        { main: 'Snow', description: 'snow', icon: '13d' },
        { main: 'Mist', description: 'misty', icon: '50d' }
    ];
    return patterns[hashString(city.toLowerCase()) % patterns.length];
}

function generateCityWeather(city) {
    const hash = hashString(city.toLowerCase());
    const baseTemp = 10 + (hash % 20);
    const coords = getCityCoordinates(city);
    const weather = pickWeatherPattern(city);

    return {
        coord: { lon: Number(coords.lon.toFixed(4)), lat: Number(coords.lat.toFixed(4)) },
        weather: [{ id: 800, main: weather.main, description: weather.description, icon: weather.icon }],
        main: {
            temp: Number((baseTemp + (hash % 10) * 0.7).toFixed(1)),
            feels_like: Number((baseTemp + (hash % 10) * 0.5).toFixed(1)),
            temp_min: Number((baseTemp - 2).toFixed(1)),
            temp_max: Number((baseTemp + 3).toFixed(1)),
            pressure: 1005 + (hash % 20),
            humidity: 50 + (hash % 50)
        },
        wind: {
            speed: Number(((hash % 8) + 1.2).toFixed(1)),
            deg: hash % 360
        },
        name: city
    };
}

// Dummy API - Mock Weather Data
const DUMMY_API = {
    cities: {
        'london': {
            coord: { lon: -0.1256, lat: 51.5085 },
            weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
            main: { temp: 18, feels_like: 17, temp_min: 16, temp_max: 20, pressure: 1013, humidity: 72 },
            wind: { speed: 4.5, deg: 230 },
            name: 'London'
        },
        'new york': {
            coord: { lon: -74.006, lat: 40.7128 },
            weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
            main: { temp: 25, feels_like: 24, temp_min: 22, temp_max: 28, pressure: 1015, humidity: 65 },
            wind: { speed: 3.2, deg: 180 },
            name: 'New York'
        },
        'tokyo': {
            coord: { lon: 139.6917, lat: 35.6762 },
            weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }],
            main: { temp: 22, feels_like: 21, temp_min: 20, temp_max: 24, pressure: 1010, humidity: 78 },
            wind: { speed: 5.1, deg: 90 },
            name: 'Tokyo'
        },
        'paris': {
            coord: { lon: 2.3522, lat: 48.8566 },
            weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
            main: { temp: 20, feels_like: 19, temp_min: 18, temp_max: 22, pressure: 1012, humidity: 70 },
            wind: { speed: 2.8, deg: 270 },
            name: 'Paris'
        },
        'sydney': {
            coord: { lon: 151.2093, lat: -33.8688 },
            weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
            main: { temp: 15, feels_like: 14, temp_min: 13, temp_max: 17, pressure: 1018, humidity: 60 },
            wind: { speed: 6.2, deg: 45 },
            name: 'Sydney'
        },
        'default': {
            coord: { lon: -0.1256, lat: 51.5085 },
            weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
            main: { temp: 18, feels_like: 17, temp_min: 16, temp_max: 20, pressure: 1013, humidity: 72 },
            wind: { speed: 4.5, deg: 230 },
            name: 'London'
        }
    },

    // Dummy forecast data
    getForecast: function() {
        const now = new Date();
        const forecasts = [];
        for (let i = 0; i < 40; i++) {
            const date = new Date(now.getTime() + (i * 3 * 60 * 60 * 1000));
            const weatherTypes = [
                { icon: '01d', main: 'Clear', description: 'sunny' },
                { icon: '02d', main: 'Clouds', description: 'partly cloudy' },
                { icon: '04d', main: 'Clouds', description: 'overcast' },
                { icon: '10d', main: 'Rain', description: 'light rain' },
                { icon: '09d', main: 'Rain', description: 'rainy' }
            ];
            const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
            const tempBase = 18 + Math.random() * 10;
            
            forecasts.push({
                dt: Math.floor(date.getTime() / 1000),
                main: {
                    temp: tempBase,
                    temp_min: tempBase - 2,
                    temp_max: tempBase + 3
                },
                weather: [weather]
            });
        }
        return { list: forecasts };
    },

    // Dummy air quality data
    getAirQuality: function() {
        return {
            list: [{
                main: { aqi: Math.floor(Math.random() * 5) + 1 },
                components: {
                    pm2_5: 15.2 + Math.random() * 20,
                    pm10: 35.8 + Math.random() * 30,
                    no2: 42.5 + Math.random() * 30,
                    o3: 65.2 + Math.random() * 20,
                    so2: 12.5 + Math.random() * 15,
                    co: 450 + Math.random() * 200
                }
            }]
        };
    },

    // Get dummy weather by city
    getWeatherByCity: function(city) {
        const cityKey = city.toLowerCase().trim();
        return this.cities[cityKey] || generateCityWeather(city);
    }
};

// Dummy Fetch Function - Simulates API calls
async function dummyFetch(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let data = {};
            
            if (url.includes('/weather')) {
                if (url.includes('q=')) {
                    const city = new URL(url, 'http://localhost').searchParams.get('q');
                    data = DUMMY_API.getWeatherByCity(city);
                } else if (url.includes('lat=') && url.includes('lon=')) {
                    data = generateCityWeather('Your Location');
                } else {
                    data = DUMMY_API.cities['default'];
                }
                data.cod = 200;
            } else if (url.includes('/forecast')) {
                data = DUMMY_API.getForecast();
                data.cod = 200;
            } else if (url.includes('/air_pollution')) {
                data = DUMMY_API.getAirQuality();
                data.cod = 200;
            }
            
            resolve({
                ok: true,
                json: async () => data,
                status: 200
            });
        }, 300); // Simulate network delay
    });
}

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    console.log('App initializing... USE_DUMMY_API:', USE_DUMMY_API);
    setupEventListeners();
    
    if (USE_DUMMY_API) {
        // Always show demo data with dummy API
        showInfo('📊 Using Dummy API with mock weather data');
        displayDemoData();
    } else {
        // Always show demo data first, then try to get real data
        displayDemoData();
        
        // Try to verify API key in background
        setTimeout(() => {
            verifyAPIKey().then(isValid => {
                if (isValid) {
                    console.log('API Key valid, fetching real weather...');
                    getLocationAndFetchWeather();
                } else {
                    console.log('API Key invalid or not verified');
                }
            });
        }, 1000);
    }
});

// Show Info Message
function showInfo(message) {
    const infoDiv = document.createElement('div');
    infoDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #dbeafe;
        color: #1e40af;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 2000;
        font-size: 14px;
    `;
    infoDiv.textContent = message;
    document.body.appendChild(infoDiv);
}

// Setup Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    locationBtn.addEventListener('click', () => {
        displayDemoData();
        setTimeout(() => {
            if (!USE_DEMO_MODE) {
                getLocationAndFetchWeather();
            }
        }, 500);
    });
}

// Display Demo Data
function displayDemoData() {
    console.log('Displaying demo data...');
    loadingScreen.style.display = 'none';
    errorMessage.style.display = 'none';
    contentDiv.style.display = 'block';
    
    const demoWeather = DUMMY_API.cities['default'];
    const demoForecast = DUMMY_API.getForecast();
    const demoAirQuality = DUMMY_API.getAirQuality();
    
    displayCurrentWeather(demoWeather, demoWeather.name);
    displayForecast(demoForecast);
    displayAirQuality(demoAirQuality);
    updateBackground(demoWeather.weather[0].main);
    
    if (!USE_DUMMY_API) {
        showInfo('⚠️ API Key not verified yet. Showing demo data. Check your OpenWeatherMap email!');
    }
}

// Get Location and Fetch Weather
function getLocationAndFetchWeather() {
    console.log('API Key Status:', USE_DEMO_MODE ? 'DEMO MODE' : 'Using API key');
    
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Location obtained:', latitude, longitude);
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.warn('Geolocation error:', error.message);
                showError('Unable to get your location. Try searching for a city instead.');
                loadingScreen.style.display = 'none';
            }
        );
    } else {
        showError('Geolocation not supported. Try searching for a city.');
        loadingScreen.style.display = 'none';
    }
}

// Verify API Key is Working
async function verifyAPIKey() {
    if (USE_DUMMY_API) {
        return true; // Dummy API always works
    }
    
    try {
        const response = await fetch(
            `${WEATHER_API_URL}?q=London&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        console.log('API Key verification:', data.cod);
        return response.ok && data.cod === 200;
    } catch (error) {
        console.error('API Key verification failed:', error);
        return false;
    }
}

// Handle Search
function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        if (USE_DEMO_MODE) {
            // Use dummy API for city search
            const dummyWeather = DUMMY_API.getWeatherByCity(city);
            loadingScreen.style.display = 'flex';
            setTimeout(() => {
                displayCurrentWeather(dummyWeather, dummyWeather.name);
                displayForecast(DUMMY_API.getForecast());
                displayAirQuality(DUMMY_API.getAirQuality());
                updateBackground(dummyWeather.weather[0].main);
                loadingScreen.style.display = 'none';
                contentDiv.style.display = 'block';
            }, 500);
        } else {
            fetchWeatherByCity(city);
        }
        searchInput.value = '';
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(latitude, longitude) {
    try {
        console.log('Fetching weather for coords:', latitude, longitude);
        
        let response;
        if (USE_DUMMY_API) {
            response = await dummyFetch(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        } else {
            response = await fetch(
                `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
        }
        
        const data = await response.json();
        console.log('Weather response:', data);
        
        if (!response.ok || data.cod !== 200) {
            throw new Error(data.message || 'Weather data not found');
        }
        await fetchAllData(data.coord.lat, data.coord.lon, data.name);
    } catch (error) {
        console.error('Fetch error:', error);
        displayDemoData();
    }
}

// Fetch Weather by City
async function fetchWeatherByCity(city) {
    try {
        console.log('Fetching weather for city:', city);
        
        let response;
        if (USE_DUMMY_API) {
            response = await dummyFetch(`${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        } else {
            response = await fetch(
                `${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );
        }
        
        const data = await response.json();
        console.log('City search response:', data);
        
        if (!response.ok || data.cod !== 200) {
            throw new Error(data.message || `City "${city}" not found`);
        }
        await fetchAllData(data.coord.lat, data.coord.lon, data.name);
    } catch (error) {
        console.error('City search error:', error);
        displayDemoData();
    }
}

// Fetch All Weather Data
async function fetchAllData(latitude, longitude, cityName) {
    try {
        console.log('Fetching all weather data for:', cityName);
        
        let weatherPromise, forecastPromise, airQualityPromise;
        
        if (USE_DUMMY_API) {
            weatherPromise = dummyFetch(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then(r => r.json());
            forecastPromise = dummyFetch(`${FORECAST_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then(r => r.json());
            airQualityPromise = dummyFetch(`${AIR_QUALITY_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then(r => r.json());
        } else {
            weatherPromise = fetch(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then(r => r.json());
            forecastPromise = fetch(`${FORECAST_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`).then(r => r.json());
            airQualityPromise = fetch(`${AIR_QUALITY_API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then(r => r.json());
        }
        
        const [weatherData, forecastData, airQualityData] = await Promise.all([
            weatherPromise,
            forecastPromise,
            airQualityPromise
        ]);

        console.log('All data fetched successfully');

        displayCurrentWeather(weatherData, cityName);
        displayForecast(forecastData);
        displayAirQuality(airQualityData);
        updateBackground(weatherData.weather[0].main);

        loadingScreen.style.display = 'none';
        contentDiv.style.display = 'block';
    } catch (error) {
        console.error('Error fetching all data:', error);
        displayDemoData();
    }
}

// Display Current Weather
function displayCurrentWeather(data, cityName) {
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const windSpeed = data.wind.speed;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('weatherDescription').textContent = 
        description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${windSpeed.toFixed(1)} m/s`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('weatherIcon').className = weatherIconMap[icon];

    // Set initial air quality (will be updated with API data)
    document.getElementById('airQuality').textContent = 'Loading...';
}

// Display 5-Day Forecast
function displayForecast(data) {
    forecastGrid.innerHTML = '';
    
    // Get forecast for every 8th item (24-hour intervals, data comes every 3 hours)
    const dailyForecasts = {};
    
    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                temp: item.main.temp,
                tempMin: item.main.temp_min,
                tempMax: item.main.temp_max,
                icon: item.weather[0].icon,
                description: item.weather[0].description,
                date: date
            };
        }
    });

    // Get first 5 days
    Object.values(dailyForecasts).slice(0, 5).forEach((forecast, index) => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="forecast-date">${forecast.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <i class="${weatherIconMap[forecast.icon]} forecast-icon"></i>
            <div class="forecast-temp">${Math.round(forecast.tempMax)}° / ${Math.round(forecast.tempMin)}°</div>
            <div class="forecast-description">${forecast.description}</div>
        `;
        
        forecastGrid.appendChild(card);
    });
}

// Display Air Quality
function displayAirQuality(data) {
    if (!data.list || data.list.length === 0) {
        airQualityGrid.innerHTML = '<p style="color: white;">Air quality data unavailable</p>';
        return;
    }

    const airData = data.list[0];
    const components = airData.components;
    const aqi = airData.main.aqi;

    // Update main air quality display
    const aqiLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    document.getElementById('airQuality').textContent = aqiLabels[aqi - 1];

    // Air Quality Grid
    const aqCards = [
        { label: 'PM2.5', value: components.pm2_5?.toFixed(2), unit: 'μg/m³' },
        { label: 'PM10', value: components.pm10?.toFixed(2), unit: 'μg/m³' },
        { label: 'NO₂', value: components.no2?.toFixed(2), unit: 'μg/m³' },
        { label: 'O₃', value: components.o3?.toFixed(2), unit: 'μg/m³' },
        { label: 'SO₂', value: components.so2?.toFixed(2), unit: 'μg/m³' },
        { label: 'CO', value: (components.co / 1000)?.toFixed(2), unit: 'mg/m³' }
    ];

    airQualityGrid.innerHTML = '';
    aqCards.forEach((card, index) => {
        const div = document.createElement('div');
        div.className = 'air-quality-card';
        div.innerHTML = `
            <div class="aq-label">${card.label}</div>
            <div class="aq-value">${card.value || 'N/A'}</div>
            <div style="font-size: 12px; color: #718096;">${card.unit}</div>
        `;
        airQualityGrid.appendChild(div);
    });
}

// Update Background
function updateBackground(weatherMain) {
    const weatherType = weatherBackgroundMap[weatherMain.toLowerCase()];
    
    // Remove all weather classes
    Object.values(weatherBackgroundMap).forEach(type => {
        background.classList.remove(type);
    });
    
    // Add the appropriate weather class
    if (weatherType) {
        background.classList.add(weatherType);
    } else {
        background.classList.add('clear');
    }
}

// Show Error
function showError(message) {
    console.log('Error:', message);
    // Show demo data as fallback
    displayDemoData();
}

// Get Weather Icon
function getWeatherIcon(iconCode) {
    return weatherIconMap[iconCode] || 'fas fa-cloud';
}
