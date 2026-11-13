import {
  Card, CardContent, CardMedia, Grid, Stack, Typography, Box
} from "@mui/material";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import ThunderstormRoundedIcon from "@mui/icons-material/ThunderstormRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import CompressRoundedIcon from "@mui/icons-material/CompressRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const conditionIcons = {
  Clear: WbSunnyRoundedIcon,
  Clouds: CloudRoundedIcon,
  Rain: WaterDropRoundedIcon,
  Drizzle: WaterDropRoundedIcon,
  Thunderstorm: ThunderstormRoundedIcon,
  Snow: AcUnitRoundedIcon,
  Mist: CloudRoundedIcon,
  Haze: CloudRoundedIcon,
  Fog: CloudRoundedIcon
};

function temperature(value, unit) {
  const converted = unit === "F" ? value * 9 / 5 + 32 : value;
  return `${Math.round(converted)}°${unit}`;
}

function Metric({ icon: Icon, label, value }) {
  return (
    <Grid item xs={6} sm={3}>
      <Box className="metric-card">
        <Icon color="primary" />
        <Typography variant="caption" color="text.secondary" display="block">{label}</Typography>
        <Typography variant="subtitle1" fontWeight={800}>{value}</Typography>
      </Box>
    </Grid>
  );
}

export default function InfoBox({ info, unit = "C" }) {
  const isFreezing = info.temperature <= 0;
  const WeatherIcon = isFreezing ? AcUnitRoundedIcon : (conditionIcons[info.condition] || WbSunnyRoundedIcon);
  const tempColor = info.temperature > 30 ? "#dc2626" : info.temperature < 10 ? "#2563eb" : "text.primary";
  const weatherImage = isFreezing
    ? "/winter-weather.svg"
    : `https://openweathermap.org/img/wn/${info.icon}@4x.png`;

  return (
    <Card
      elevation={0}
      className={isFreezing ? "weather-card winter-weather-card" : "weather-card"}
      sx={isFreezing ? {
        background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 55%, #ffffff 100%) !important",
        borderColor: "#bae6fd"
      } : undefined}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={800}>{info.city}, {info.country}</Typography>
            <Typography color="text.secondary" sx={{ textTransform: "capitalize" }}>{info.description}</Typography>
            {isFreezing && (
              <Typography variant="caption" color="info.dark" fontWeight={700}>
                FREEZING CONDITIONS · WINTER MODE
              </Typography>
            )}
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CardMedia
              component="img"
              image={weatherImage}
              alt={isFreezing ? "Snowflake winter weather" : `${info.condition} weather`}
              sx={{ width: 88, height: 88, objectFit: "contain" }}
            />
            <WeatherIcon sx={{ fontSize: 34, color: isFreezing ? "#0284c7" : "#f59e0b" }} />
            <Box>
              <Typography variant="h2" fontWeight={800} sx={{ color: isFreezing ? "#0369a1" : tempColor, lineHeight: 1.1 }}>
                {temperature(info.temperature, unit)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Feels like {temperature(info.feelsLike, unit)}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Grid container spacing={1.5} sx={{ mt: 2 }}>
          <Metric icon={WaterDropRoundedIcon} label="Humidity" value={`${info.humidity}%`} />
          <Metric icon={AirRoundedIcon} label="Wind speed" value={`${info.windSpeed} m/s`} />
          <Metric icon={CompressRoundedIcon} label="Pressure" value={`${info.pressure} hPa`} />
          <Metric icon={VisibilityRoundedIcon} label="Visibility" value={`${(info.visibility / 1000).toFixed(1)} km`} />
        </Grid>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, pt: 2, borderTop: "1px solid #e7edf5" }}>
          <Typography variant="body2" color="text.secondary">Low: <b>{temperature(info.tempMin, unit)}</b></Typography>
          <Typography variant="body2" color="text.secondary">High: <b>{temperature(info.tempMax, unit)}</b></Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
