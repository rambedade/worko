import axios from 'axios';

// ✅ Update this with your Render backend URL
const API = axios.create({ baseURL: 'https://candidate-referral-api.onrender.com/api' });

export const fetchCandidates = () => API.get('/candidates');
export const addCandidate = (candidateData) => API.post('/candidates', candidateData);
export const updateStatus = (id, status) => API.put(`/candidates/${id}/status`, { status });
export const deleteCandidate = (id) => API.delete(`/candidates/${id}`);
