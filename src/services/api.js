import axios from 'axios';

const API_URL = 'http://localhost:5079/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const entityService = {
  addEntity: (data) => {
    return apiClient.post('/entity/add', data);
  },
  
  deleteEntity: (identifier) => {
    return apiClient.delete(`/entity/delete/${identifier}`);
  },
  
  listEntities: () => {
    return apiClient.get('/entity/list');
  },
  
  searchEntity: (identifier) => {
    return apiClient.get(`/entity/search/${identifier}`);
  }
};

export default apiClient;