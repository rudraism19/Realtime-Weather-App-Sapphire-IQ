# SapphireIQ Weather Application 🌤️

SapphireIQ is a responsive weather dashboard built with **React, Vite, Material UI and the OpenWeatherMap REST API**. Search for a city to view current conditions and a five-day forecast.

## Features

- Search weather by city name with controlled input validation
- Default city loads as **Delhi** when the application starts
- Current conditions: temperature, feels-like temperature, minimum/maximum temperature, humidity, wind speed, pressure and visibility
- Five-day forecast summarized from the OpenWeatherMap 5 Day / 3 Hour Forecast endpoint
- Celsius / Fahrenheit display toggle
- Dynamic condition icons and a special snowy/frost theme at temperatures of **0°C or below**
- Loading indicator and contextual API error alerts, including city-not-found feedback
- Network failures are logged to the browser console for debugging
- Responsive Material UI layout

## Tech stack

- React 19 and Vite
- Material UI (MUI) and MUI Icons
- OpenWeatherMap Current Weather and 5 Day / 3 Hour Forecast APIs
- JavaScript (ES modules) and CSS

## Project structure

```text
sapphireiq-weather/
├── public/
│   └── winter-weather.svg
├── src/
│   ├── components/
│   │   ├── Forecast.jsx
│   │   ├── InfoBox.jsx
│   │   └── SearchBox.jsx
│   ├── App.jsx
│   ├── WeatherApp.jsx
│   ├── index.css
│   ├── main.jsx
│   └── weather.js
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/rudraism19/Realtime-Weather-App-Sapphire-IQ.git
cd Realtime-Weather-App-Sapphire-IQ/sapphireiq-weather
```

If you already cloned the repository, pull the latest changes from its default branch:

```bash
git pull
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get an OpenWeatherMap API key

1. Create an account at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
2. Verify your email address.
3. Open the [API keys dashboard](https://home.openweathermap.org/api_keys).
4. Copy an existing key or generate a new one.
5. If a new key is not active immediately, allow time for activation.

The application calls these endpoints using the same API key:

- Current weather: `/data/2.5/weather`
- Five-day forecast: `/data/2.5/forecast`

Both requests use metric units (`units=metric`).

### 4. Configure the environment variable

Create a file named `.env` in the `sapphireiq-weather` project root (the same directory as `package.json`). Copy the format from `.env.example` and replace the placeholder:

```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key
```

Do not add quotation marks or spaces around the equals sign. The real `.env` file is ignored by Git.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### 6. Create and preview a production build

```bash
npm run build
npm run preview
```

## Application architecture

- **WeatherApp.jsx:** root/container component. Owns weather, forecast, loading, error, unit and last-updated state. Loads Delhi on mount and passes data down through props.
- **SearchBox.jsx:** presentational form with local controlled input state. Validates trimmed input and sends the city to WeatherApp through an `onSearch` callback.
- **weather.js:** performs asynchronous API requests, parses JSON, normalizes weather data and handles HTTP/network errors.
- **InfoBox.jsx:** prop-driven MUI weather card using Card, CardContent and CardMedia. Applies red text above 30°C, blue text below 10°C, and a snowy/frost presentation at or below 0°C.
- **Forecast.jsx:** renders the five-day forecast from the parent-provided forecast data.
- **App.jsx:** backward-compatible re-export of WeatherApp for older imports.

Data flows down from WeatherApp through props; user actions flow upward through callbacks.

## Learning modules and PRD checklist

1. **MUI fundamentals:** Material UI buttons, variants, icons, typography and layout.
2. **SearchBox:** controlled input, `useState`, `onChange`, `onSubmit`, `preventDefault()`, whitespace trimming and minimum two-character validation.
3. **Weather API:** OpenWeatherMap API key, `fetch()`, async/await, JSON parsing, data sanitization, wind speed and country extraction, and console logging for network failures.
4. **InfoBox:** reusable prop-driven MUI Card with CardMedia, CardContent, responsive metrics and temperature color thresholds.
5. **WeatherApp and state lifting:** parent-owned state, props, callback functions, default Delhi lookup on mount and a Last Updated timestamp.
6. **Dynamic UI:** condition-based icons, MUI Alert errors including 404 city-not-found, frost mode at temperatures ≤ 0°C, and Celsius/Fahrenheit conversion.

## Troubleshooting

| Problem | What to check |
|---|---|
| Missing API key message | Ensure `.env` is in the project root and the variable is exactly `VITE_OPENWEATHER_API_KEY`. |
| API returns 401 | Check the API key and whether it has finished activating. |
| City returns 404 | Check the city spelling and try a well-known city. |
| API returns 429 | The API rate limit may have been reached; wait and retry. |
| Network error | Check internet connectivity and the browser console. |
| Environment changes are not detected | Stop Vite with `Ctrl + C`, then run `npm run dev` again. |
| Dependencies are missing | Run `npm install` from the directory containing `package.json`. |

## Deployment

Deploy the `sapphireiq-weather` directory to Vercel or Netlify:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_OPENWEATHER_API_KEY`

Redeploy after changing hosting environment variables.

## API key security

**Important:** Vite exposes variables prefixed with `VITE_` in the client-side bundle. This is convenient for a learning project, but the API key is visible to users in the browser and must not be treated as a secret. Never commit your real `.env` file. For a public production application, proxy weather requests through a backend/serverless function and apply appropriate rate limits.

---

Built as a hands-on React learning project: **SapphireIQ Weather Application**.
