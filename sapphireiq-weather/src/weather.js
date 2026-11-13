const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error("Weather API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file and restart Vite.");
  }
}

async function requestWeather(endpoint, city) {
  ensureApiKey();
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.search = new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: "metric"
  }).toString();

  const response = await fetch(url);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 404) throw new Error(`City "${city}" was not found. Check the spelling and try again.`);
    if (response.status === 401) throw new Error("OpenWeatherMap rejected the API key. Check that it is correct and active.");
    if (response.status === 429) throw new Error("API rate limit reached. Please try again later.");
    throw new Error(data.message || "Unable to fetch weather data. Please try again.");
  }
  return data;
}

export async function getWeatherInfo(city) {
  const data = await requestWeather("weather", city);
  const condition = data.weather?.[0]?.main || "Unknown";
  return {
    city: data.name,
    country: data.sys?.country || "",
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    tempMin: data.main.temp_min,
    tempMax: data.main.temp_max,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind?.speed ?? 0,
    windDeg: data.wind?.deg ?? 0,
    visibility: data.visibility,
    description: data.weather?.[0]?.description || "No description",
    condition,
    icon: data.weather?.[0]?.icon || "01d",
    sunrise: data.sys?.sunrise,
    sunset: data.sys?.sunset,
    timezone: data.timezone
  };
}

export async function getForecast(city) {
  const data = await requestWeather("forecast", city);
  const daily = new Map();

  for (const entry of data.list || []) {
    const date = entry.dt_txt?.slice(0, 10);
    if (!date) continue;
    if (!daily.has(date)) daily.set(date, []);
    daily.get(date).push(entry);
  }

  return [...daily.entries()].slice(0, 5).map(([date, entries]) => {
    const midday = entries.find((entry) => entry.dt_txt?.includes("12:00:00")) || entries[Math.floor(entries.length / 2)];
    return {
      date,
      temperature: midday.main.temp,
      min: Math.min(...entries.map((entry) => entry.main.temp_min)),
      max: Math.max(...entries.map((entry) => entry.main.temp_max)),
      condition: midday.weather?.[0]?.main || "Unknown",
      description: midday.weather?.[0]?.description || "",
      icon: midday.weather?.[0]?.icon || "01d"
    };
  });
}
