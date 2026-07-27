import api from './api';

/**
 * Service handlers for Onam Lucky Draw API endpoints
 */
export const drawService = {
  // Fetch active event details & stats
  getEventDetails: async () => {
    return api.get('/event/active');
  },

  // Fetch prize list
  getPrizes: async () => {
    return api.get('/prizes');
  },

  // Purchase tickets
  purchaseTickets: async (payload) => {
    return api.post('/tickets/purchase', payload);
  },

  // Verify ticket status by code or phone number
  verifyTicket: async (ticketCode) => {
    return api.get(`/tickets/verify/${ticketCode}`);
  },

  // Admin: Get live participants list
  getParticipants: async (params) => {
    return api.get('/admin/participants', { params });
  },

  // Admin: Execute live random lucky draw winner selection
  pickWinner: async (drawId) => {
    return api.post(`/admin/draws/${drawId}/pick-winner`);
  },
};

export default drawService;
