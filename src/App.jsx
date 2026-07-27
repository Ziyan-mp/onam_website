import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';

/**
 * Root Application Shell Component
 */
export function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'transparent',
              boxShadow: 'none',
              padding: 0,
            },
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
