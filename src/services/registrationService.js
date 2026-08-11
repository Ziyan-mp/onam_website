import api from './api';

export const submitRegistration = async (registrationData) => {
  try {
    // api.js response interceptor already returns response.data
    const response = await api.post('/registration/submit', registrationData);
    return response;
  } catch (error) {
    // api.js error interceptor throws customError with a populated message
    throw new Error(error.message || 'Failed to submit registration');
  }
};
