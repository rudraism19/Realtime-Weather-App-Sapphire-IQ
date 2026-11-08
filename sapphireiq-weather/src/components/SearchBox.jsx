
import { useState } from "react";

import {
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({ onSearch }) {

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCity(event.target.value);

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (trimmedCity.length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }

    setError("");
    onSearch(trimmedCity);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 3,
        border: "1px solid #e2e8f0",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Search Weather
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>

          <TextField
            fullWidth
            label="Enter City Name"
            placeholder="e.g. Bhopal, Mumbai, Delhi"
            value={city}
            onChange={handleChange}
            error={Boolean(error)}
            helperText={error || "Search weather by city"}
          />

          <Button
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}
            size="large"
          >
            Search Weather
          </Button>

        </Stack>
      </form>
    </Paper>
  );
}
