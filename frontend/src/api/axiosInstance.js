import axios from 'axios';

let apiURL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';
if (apiURL && !apiURL.endsWith('/api') && !apiURL.endsWith('/api/')) {
  apiURL = apiURL.endsWith('/') ? `${apiURL}api` : `${apiURL}/api`;
}

const axiosInstance = axios.create({
  baseURL: apiURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
