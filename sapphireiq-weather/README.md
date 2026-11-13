# SapphireIQ Weather Application

A modern weather dashboard built with React, Vite, Material UI and the OpenWeatherMap REST API.

## Features

- City search with controlled React form and validation
- Current conditions: temperature, feels-like, min/max, humidity, wind, pressure and visibility
- Five-day forecast (daily summaries from the 5-day/3-hour forecast endpoint)
- Celsius / Fahrenheit toggle
- Dynamic weather-condition icons and temperature emphasis
- Loading, API error and missing-key states
- Responsive Material UI layout

## Tech stack

- React 19 + Vite
- Material UI and MUI Icons
- OpenWeatherMap Current Weather and 5 Day / 3 Hour Forecast APIs

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file by copying `.env.example` to `.env`.
3. Add your OpenWeatherMap API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Create a production build:

   ```bash
   npm run build
   ```

## Project modules

1. **MUI integration:** buttons, typography, icons, layout and styling.
2. **SearchBox:** controlled input, event handling, whitespace and minimum-length validation.
3. **Weather API:** asynchronous fetch, JSON parsing and data normalization.
4. **InfoBox:** presentational weather card driven by props.
5. **WeatherApp state:** state lifting, callbacks, default city load and last-updated timestamp.
6. **Dynamic UI:** condition icons, loading and error feedback, temperature color tiers and Celsius/Fahrenheit toggle.

## API key and security

OpenWeatherMap API key is required. Vite client-side variables prefixed with `VITE_` are bundled into client code and can be seen by users. Never commit your real `.env` file or rely on a frontend key as a secret. For production deployments, proxy requests through a backend and apply appropriate rate limits.

## Deployment

Deploy the `sapphireiq-weather` directory to Vercel or Netlify and configure `VITE_OPENWEATHER_API_KEY` in the hosting provider's environment variables before building.
