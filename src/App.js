// src/App.js
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Game from './components/Game';

// Custom theme for MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Custom color for buttons and layout
    },
    background: {
      default: '#f4f6f8', // Light background color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '0.1rem',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Game />
    </ThemeProvider>
  );
};

export default App;
