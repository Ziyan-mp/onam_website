import api from './api';

export const adminLogin = async (credentials) => {
    return await api.post('/admin/login', credentials);
};

export const getDashboardStats = async () => {
    return await api.get('/admin/dashboard-stats');
};

export const getTickets = async () => {
    return await api.get('/admin/tickets');
};

export const getReports = async () => {
    return await api.get('/admin/reports');
};

export const getSettings = async () => {
    return await api.get('/admin/settings');
};

export const updateSettings = async (data) => {
    return await api.put('/admin/settings', data);
};

export const getDrawStatus = async () => {
    return await api.get('/admin/draw/status');
};

export const executeDraw = async () => {
    return await api.post('/admin/draw/execute');
};
