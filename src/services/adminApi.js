import api from './api';

export const adminLogin = async (credentials) => {
    return await api.post('/login', credentials);
};

export const getDashboardStats = async () => {
    return await api.get('/dashboard-stats');
};

export const getTickets = async () => {
    return await api.get('/tickets');
};

export const getReports = async () => {
    return await api.get('/reports');
};

export const getSettings = async () => {
    return await api.get('/settings');
};

export const updateSettings = async (data) => {
    return await api.put('/settings', data);
};

export const getDrawStatus = async () => {
    return await api.get('/draw/status');
};

export const executeDraw = async () => {
    return await api.post('/draw/execute');
};
