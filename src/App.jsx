import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import { DrawProvider } from './context/DrawContext';
import { AuthProvider } from './context/AuthContext';

/**
 * Root Application Shell Component
 */
export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <DrawProvider>
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
          </DrawProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
