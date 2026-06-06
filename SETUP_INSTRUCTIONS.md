# Weather App Setup Instructions

## Current Status: DEMO MODE

The app is currently running in **DEMO MODE** with sample London weather data. To use real weather data for your location and any city worldwide, follow these steps:

## Step 1: Get a Free OpenWeatherMap API Key

1. Visit: [https://openweathermap.org/api](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Verify your email
4. Go to "API keys" section in your account
5. Copy your **Default API Key** (it's already generated)

## Step 2: Update the API Key in the App

### Option A: Direct Edit (Quick)
1. Open `weather-app.js` in your editor
2. Find line 3: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

**Before:**
```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

**After:**
```javascript
const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
```

## Step 3: Refresh the App

1. Refresh your browser (F5 or Cmd+R)
2. Allow location access when prompted
3. The app will now show real weather data for your location!

## Features After Setup

✅ **Real-time weather** for your current location
✅ **Search any city** worldwide
✅ **Air quality data** with pollutant details
✅ **5-day forecast** grid
✅ **Dynamic backgrounds** based on weather conditions
✅ **Automatic geolocation** detection

## Troubleshooting

### "Weather data not found" Error
- **Solution**: Verify your API key is correct and copied completely
- Wait a few seconds after page load (API sometimes takes time)
- Check that geolocation permission was granted

### Geolocation Not Working
- Make sure you allowed location access in browser
- Refresh the page if previously denied
- Use the search bar to find a city instead

### Still in Demo Mode?
- Verify the API key was saved correctly in `weather-app.js`
- Make sure you saved the file (Ctrl+S or Cmd+S)
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

## Running the App

### Option 1: Simple (Recommended)
```bash
npm start
```
Opens the app automatically at http://localhost:8000

### Option 2: Manual
```bash
npm run server
```
Then open http://localhost:8000 in your browser

## Need Help?

- **OpenWeatherMap Docs**: https://openweathermap.org/api
- **API Key Issues**: Check https://home.openweathermap.org/api_keys
- **Free Tier Limits**: Free API includes weather, forecast, and air quality data

## Demo Mode Features (Without API Key)

Even in demo mode, you can see:
- How the app looks and works
- All UI components and animations
- 5-day forecast display
- Air quality information layout
- Beautiful dynamic backgrounds
- Weather detail cards

## Next Steps

1. ✅ Get your free API key
2. ✅ Update `weather-app.js` with your key
3. ✅ Refresh the browser
4. ✅ Enjoy real weather data!

---

**Happy Weather Watching! 🌤️⛅🌦️**
