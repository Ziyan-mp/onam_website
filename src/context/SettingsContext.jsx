import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    eventName: 'Ponnonam Lucky Draw',
    targetAmount: 150000,
    entryFee: 150,
    targetDate: new Date('2026-08-28T17:00:00+05:30').toISOString(),
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/public/settings');
      if (response.success && response.settings) {
        setSettings({
          eventName: response.settings.eventName || 'Ponnonam Lucky Draw',
          targetAmount: response.settings.targetAmount !== undefined ? response.settings.targetAmount : 150000,
          entryFee: response.settings.entryFee !== undefined ? response.settings.entryFee : 150,
          targetDate: response.settings.targetDate || new Date('2026-08-28T17:00:00+05:30').toISOString(),
        });
      }
    } catch (error) {
      console.error('Failed to fetch global settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings: fetchSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
