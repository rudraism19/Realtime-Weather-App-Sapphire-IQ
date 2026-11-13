import React, { useCallback, useEffect, useState } from "react";
import {
  Alert, Box, Button, Chip, CircularProgress, Container, Divider,
  Paper, Stack, Switch, Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SearchBox from "./components/SearchBox";
import InfoBox from "./components/InfoBox";
import Forecast from "./components/Forecast";
import { getWeatherInfo, getForecast } from "./weather";

const DEFAULT_CITY = "Delhi";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const [lastUpdated, setLastUpdated] = useState(null);

  // WeatherApp owns shared data; child components receive data through props.
  const updateInfo = useCallback(async (city) => {
    setLoading(true);
    setError("");
    try {
      const [current, nextForecast] = await Promise.all([
        getWeatherInfo(city),
        getForecast(city)
      ]);
      setWeather(current);
      setForecast(nextForecast);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load the PRD's default city once when the root component mounts.
  useEffect(() => {
    updateInfo(DEFAULT_CITY);
  }, [updateInfo]);

  const handleSearch = (city) => updateInfo(city);
  const toggleUnit = () => setUnit((value) => value === "C" ? "F" : "C");

  return (
    <Box className="app-shell">
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 5 } }}>
        <Paper elevation={0} className="app-panel">
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <CloudIcon color="primary" sx={{ fontSize: 34 }} />
            <Typography variant="h5" fontWeight={800} className="brand-name">SapphireIQ</Typography>
            <Chip label="STUDENT PROJECT" color="primary" size="small" />
            <Box flexGrow={1} />
            <WbSunnyIcon sx={{ color: "#f59e0b", fontSize: 28 }} />
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Box className="hero-copy">
            <Typography variant="overline" color="primary" fontWeight={800}>
              LIVE WEATHER DASHBOARD
            </Typography>
            <Typography variant="h2" component="h1" fontWeight={800}>
              Weather Application
            </Typography>
            <Typography color="text.secondary">
              React + Material UI + OpenWeatherMap API
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 620 }}>
              Search a city to explore current conditions, temperature, humidity,
              wind and the upcoming forecast.
            </Typography>
          </Box>

          <SearchBox onSearch={handleSearch} loading={loading} />

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3, mb: 1 }}>
            <Typography variant="h6" fontWeight={800}>Current conditions</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" color={unit === "C" ? "primary" : "text.secondary"}>°C</Typography>
              <Switch checked={unit === "F"} onChange={toggleUnit} inputProps={{ "aria-label": "Toggle Fahrenheit" }} />
              <Typography variant="body2" color={unit === "F" ? "primary" : "text.secondary"}>°F</Typography>
            </Stack>
          </Stack>

          {loading && (
            <Stack alignItems="center" spacing={1} sx={{ py: 5 }}>
              <CircularProgress />
              <Typography color="text.secondary" variant="body2">Fetching weather data…</Typography>
            </Stack>
          )}

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          {weather && !loading && !error && (
            <>
              <InfoBox info={weather} unit={unit} />
              <Forecast items={forecast} unit={unit} />
              <Typography variant="caption" color="text.secondary" display="block" textAlign="right" sx={{ mt: 2 }}>
                Last Updated: {lastUpdated?.toLocaleString() ?? "—"}
              </Typography>
            </>
          )}

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography variant="h6" fontWeight={800}>Module 1: MUI Components</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Material UI button variants and icon integration.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</Button>
              <Button variant="contained" color="success" startIcon={<SendIcon />}>Submit</Button>
              <Button variant="outlined" disabled>Disabled</Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
            SapphireIQ Weather Project • React, MUI & OpenWeatherMap
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
