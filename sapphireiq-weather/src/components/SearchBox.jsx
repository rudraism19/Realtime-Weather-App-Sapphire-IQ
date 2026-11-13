import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox({ onSearch, loading = false }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = city.trim();
    if (value.length < 2) {
      setError("Enter at least 2 characters.");
      return;
    }
    setError("");
    onSearch(value);
  };

  return (
    <Paper component="section" elevation={0} className="search-panel">
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Search weather</Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <TextField
            fullWidth
            label="City name"
            placeholder="e.g. Bhopal, Mumbai, Delhi"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              if (error) setError("");
            }}
            error={Boolean(error)}
            helperText={error || "Search by city name"}
            inputProps={{ maxLength: 80 }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            disabled={loading}
            sx={{ minWidth: { sm: 190 }, minHeight: 56 }}
          >
            {loading ? "Loading…" : "Search weather"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
