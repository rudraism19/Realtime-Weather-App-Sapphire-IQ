# SapphireIQ Weather Application 🌤️

SapphireIQ is a responsive weather dashboard built with **React, Vite, Material UI and the OpenWeatherMap API**. Search for a city to view its current weather and a five-day forecast.

## Features

- Search weather by city name
- Input validation (trims whitespace and requires at least two characters)
- Current weather: temperature, feels-like temperature, daily minimum/maximum, humidity, wind speed, pressure and visibility
- Five-day forecast, summarized from OpenWeatherMap's 5 Day / 3 Hour Forecast endpoint
- Celsius / Fahrenheit display toggle
- Weather-condition icons and responsive dashboard layout
- Loading indicator and readable API error messages
- Default weather lookup for Bhopal

## Tech stack

- React 19
- Vite
- Material UI (MUI) and MUI Icons
- OpenWeatherMap REST API
- JavaScript (ES modules) and CSS

## Project structure

```text
sapphireiq-weather/
├── public/
├── src/
│   ├── components/
│   │   ├── Forecast.jsx
│   │   ├── InfoBox.jsx
│   │   └── SearchBox.jsx
│   ├── App.jsx
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

If you already have the repository locally, pull the latest changes from its default branch:

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
5. If a newly generated key does not work immediately, allow time for activation.

The application uses these API endpoints:

- **Current weather:** `/data/2.5/weather`
- **Five-day forecast:** `/data/2.5/forecast`

Both requests use the same API key and request metric units.

### 4. Configure the environment variable

Create a file named `.env` in the `sapphireiq-weather` project root (the same directory as `package.json`). Copy the format from `.env.example` and replace the placeholder:

```env
VITE_OPENWEATHER_API_KEY=your_actual_api_key
```

Do not add quotation marks or spaces around the equals sign. Keep your real `.env` file out of Git commits; it is ignored by the project's `.gitignore`.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal (usually `http://localhost:5173`).

### 6. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## How the application works

1. **SearchBox** manages the city input, validates it and calls the `onSearch` callback.
2. **App** owns the weather, forecast, loading, error and temperature-unit state. It passes the search callback down to SearchBox and the fetched data to display components (state lifting).
3. **weather.js** calls OpenWeatherMap asynchronously, handles HTTP/API errors and normalizes the response data.
4. **InfoBox** receives current weather through props and displays conditions and weather metrics.
5. **Forecast** receives the forecast array through props and renders daily summaries.
6. **Dynamic UI** displays loading and error states, maps conditions to icons and converts displayed temperatures between Celsius and Fahrenheit without another API request.

## Troubleshooting

| Problem | What to check |
|---|---|
| Missing API key message | Confirm `.env` is in the project root and the variable is named exactly `VITE_OPENWEATHER_API_KEY`. |
| API returns 401 | Check the key for typos and confirm it has become active. |
| City returns 404 | Check the spelling and try a well-known city name. |
| API returns 429 | The API rate limit may have been reached; wait and retry. |
| Changes to `.env` are not detected | Stop Vite with `Ctrl + C`, then run `npm run dev` again. |
| Dependencies or modules are missing | Run `npm install` from the directory containing `package.json`. |
| Network request fails | Check your internet connection and browser developer console. |

## Deployment

You can deploy the `sapphireiq-weather` application directory to a Vite-compatible host such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

- Set the build command to `npm run build`.
- Set the output directory to `dist`.
- Add `VITE_OPENWEATHER_API_KEY` to the host's environment variables.
- Redeploy after adding or changing environment variables.

## API key security

**Important:** Vite exposes variables prefixed with `VITE_` in the client-side bundle. This setup is convenient for a learning project, but the API key is visible to users in the browser and must not be treated as a secret. Do not commit your real `.env` file. For a public production application, route weather requests through a backend/serverless function and apply appropriate rate limits and key restrictions where supported.

## Learning modules

1. **MUI fundamentals:** buttons, typography, icons, variants, colors and layout.
2. **SearchBox:** controlled inputs, React state, event handling and validation.
3. **Weather API integration:** `fetch`, async/await, JSON parsing and error handling.
4. **InfoBox:** reusable, prop-driven weather display component.
5. **State lifting:** parent-owned state, callbacks, default city loading and timestamps.
6. **Dynamic UI:** conditional rendering, loading/error feedback, weather icons and Celsius/Fahrenheit conversion.

---

Built as a hands-on React learning project: **SapphireIQ Weather Application**.
