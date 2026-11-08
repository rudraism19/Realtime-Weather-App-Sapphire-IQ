
import React from "react";
import SearchBox from "./components/SearchBox";

import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Chip,
  Divider,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7ff",
        p: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: 5,
          borderRadius: 4,
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={4}
        >
          <CloudIcon color="primary" fontSize="large" />

          <Typography variant="h5" fontWeight="bold">
            SapphireIQ
          </Typography>

          <Chip
            label="STUDENT PROJECT"
            color="primary"
            size="small"
            sx={{ ml: 2 }}
          />
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Main Content */}
        <Stack alignItems="center" spacing={2}>
          <WbSunnyIcon
            sx={{ fontSize: 75, color: "#f59e0b" }}
          />

          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            textAlign="center"
          >
            Weather Application
          </Typography>

          <Typography color="text.secondary" textAlign="center">
            React + Material UI + OpenWeatherMap API
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 550 }}
          >
            A modern weather application built with React
            and Material UI. Search cities and explore
            real-time weather information.
          </Typography>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Module 1 Practical Exercise */}
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Module 1: MUI Components
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Test different Material UI button variants.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<SendIcon />}
          >
            Submit
          </Button>

          <Button
            variant="outlined"
            disabled
          >
            Disabled
          </Button>
        </Stack>
        <SearchBox
         onSearch={(city) => console.log("Searching:", city)}
              />

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="center"
        >
          SapphireIQ Weather Project • Module 01
        </Typography>
      </Paper>
    </Box>
  );
}

export default App;
