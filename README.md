# Weather App 🌤️

A beautiful, responsive weather application with real-time weather data, 5-day forecast, and air quality information.

## Features ✨

- **Current Weather Display**: Temperature, humidity, wind speed, and pressure
- **5-Day Forecast Grid**: Beautiful card layout showing daily forecasts
- **Air Quality Monitoring**: Detailed pollutant levels (PM2.5, PM10, NO₂, O₃, SO₂, CO)
- **Geolocation Support**: Automatically detects user's location worldwide
- **City Search**: Search for weather in any city around the world
- **Dynamic Backgrounds**: Beautiful animated gradients that change based on weather conditions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Data**: Powered by OpenWeatherMap API

## Weather Backgrounds

The app features unique, animated backgrounds for different weather conditions:
- ☀️ **Clear**: Purple to pink gradient
- ☁️ **Clouds**: Blue sky gradient
- 🌧️ **Rain**: Dark gray gradient
- ⛈️ **Thunderstorm**: Deep dark gradient
- ❄️ **Snow**: Light blue gradient
- 🌫️ **Mist/Fog**: Gray gradient

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key

### 2. Configure API Key

Open `weather-app.js` and replace the API key:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

Replace `'e3f8c9c1b7a8c9d8e3f8c9c1b7a8c9d8'` with your actual API key.

### 3. Run the App

- **Local File**: Simply open `index.html` in your web browser
- **Web Server**: For best results, serve the files using a local web server (Python, Node.js, etc.)

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js with http-server
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Usage

### Get Current Location Weather
- Click the location button (📍) to automatically fetch weather for your current location
- The app will request permission to access your location

### Search for a City
- Type a city name in the search box
- Press Enter or click the search button
- Results include cities worldwide

### View Weather Details
- **Current Weather**: Main temperature, weather condition, and weather icon
- **Weather Details**: Humidity, wind speed, and pressure
- **5-Day Forecast**: Daily temperature highs/lows and weather conditions
- **Air Quality Index**: Detailed pollutant measurements

## API Endpoints Used

- **Current Weather**: `openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `openweathermap.org/data/2.5/forecast`
- **Air Pollution**: `openweathermap.org/data/2.5/air_pollution`

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Advanced animations and gradients
- **Vanilla JavaScript**: No dependencies
- **Font Awesome**: Weather and UI icons
- **OpenWeatherMap API**: Real-time weather data

## File Structure

```
weather-app/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── weather-app.js      # JavaScript functionality
└── README.md           # This file
```

## Features in Detail

### Dynamic Backgrounds
- Smooth gradient transitions
- Weather-specific color schemes
- Shimmer animations for depth
- Responsive to all weather conditions

### Responsive Design
- Desktop: Full 5-column forecast grid
- Tablet: 2-3 column grid
- Mobile: Optimized single column with touch-friendly buttons
- Adaptive font sizes

### Air Quality Index (AQI) Levels
- **1 = Good**: PM2.5 < 12 μg/m³
- **2 = Fair**: PM2.5 < 35.5 μg/m³
- **3 = Moderate**: PM2.5 < 55.5 μg/m³
- **4 = Poor**: PM2.5 < 150.5 μg/m³
- **5 = Very Poor**: PM2.5 ≥ 150.5 μg/m³

## Troubleshooting

### API Key Not Working
- Verify the key is correctly copied from OpenWeatherMap
- Check that you've activated the free tier plan
- Ensure the key hasn't expired

### Geolocation Not Working
- Check browser geolocation permissions
- Use HTTPS (required for geolocation on hosted sites)
- Try manually searching for a city instead

### No Data Displayed
- Check internet connection
- Verify API key validity
- Check browser console (F12) for errors
- Try a different city

## Tips for Best Experience

1. **Allow Location Access**: Grant permission for automatic location detection
2. **Use HTTPS**: Geolocation requires secure context on hosted sites
3. **Check Your Internet**: API calls require active internet connection
4. **Update API Key**: Regularly verify your API key is active

## Future Enhancements

- Hour-by-hour forecast
- Weather alerts and notifications
- Multiple location bookmarks
- Dark/Light theme toggle
- Historical weather data
- Weather charts and graphs

## License

Free to use and modify for personal or commercial projects.

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Icons: [Font Awesome](https://fontawesome.com/)

## Support

For issues or questions, check the troubleshooting section or verify:
- API key is valid and activated
- Internet connection is stable
- Browser supports geolocation and localStorage
- No browser extensions are blocking APIs

---

**Enjoy your weather app! ☀️🌧️❄️**
