import axiosInstance from './axiosInstance';

export const analyticsApi = {
  // POST /api/search
  logSearch: (data) => {
    return axiosInstance.post('/search', data);
  },

  // GET /api/search/history/:userId
  getSearchHistory: (userId) => {
    return axiosInstance.get(`/search/history/${userId}`);
  },

  // GET /api/search/recent/:userId
  getRecentSearches: (userId) => {
    return axiosInstance.get(`/search/recent/${userId}`);
  },

  // GET /api/search/trending
  getTrendingKeywords: () => {
    return axiosInstance.get('/search/trending');
  },

  // GET /api/search/categories
  getPopularCategories: () => {
    return axiosInstance.get('/search/categories');
  },

  // GET /api/search/suggestions?q=query
  getSuggestions: (query) => {
    return axiosInstance.get('/search/suggestions', { params: { q: query } });
  },

  // DELETE /api/search/history/:id
  deleteSearchHistoryItem: (id) => {
    return axiosInstance.delete(`/search/history/${id}`);
  },

  // DELETE /api/search/history/user/:userId
  deleteUserSearchHistory: (userId) => {
    return axiosInstance.delete(`/search/history/user/${userId}`);
  },

  // GET /api/admin/dashboard
  getAdminDashboard: () => {
    return axiosInstance.get('/admin/dashboard');
  }
};

export default analyticsApi;
