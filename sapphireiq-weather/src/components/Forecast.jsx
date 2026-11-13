import { Grid, Paper, Stack, Typography } from "@mui/material";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import ThunderstormRoundedIcon from "@mui/icons-material/ThunderstormRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";

const icons = {
  Clear: WbSunnyRoundedIcon,
  Clouds: CloudRoundedIcon,
  Rain: WaterDropRoundedIcon,
  Drizzle: WaterDropRoundedIcon,
  Thunderstorm: ThunderstormRoundedIcon,
  Snow: AcUnitRoundedIcon
};

const formatTemp = (value, unit) =>
  `${Math.round(unit === "F" ? value * 9 / 5 + 32 : value)}°${unit}`;

export default function Forecast({ items, unit }) {
  if (!items?.length) return null;

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight={800}>5-day forecast</Typography>
      <Grid container spacing={1.5}>
        {items.map((item) => {
          const Icon = icons[item.condition] || WbSunnyRoundedIcon;
          return (
            <Grid item xs={6} sm={4} md={2.4} key={item.date}>
              <Paper elevation={0} className="forecast-tile">
                <Typography variant="caption" color="text.secondary">
                  {new Date(`${item.date}T12:00:00`).toLocaleDateString(undefined, { weekday: "short" })}
                </Typography>
                <Icon sx={{ fontSize: 32, color: "#f59e0b", my: 1 }} />
                <Typography fontWeight={800}>{formatTemp(item.temperature, unit)}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
