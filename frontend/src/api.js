import axios from 'axios';

// Set base URL for backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Fetch all candidates
export const fetchCandidates = () => API.get('/candidates');

// Add a new candidate
export const addCandidate = (candidateData) => API.post('/candidates', candidateData);

// Update candidate status
export const updateStatus = (id, status) => API.put(`/candidates/${id}/status`, { status });

// Delete a candidate
export const deleteCandidate = (id) => API.delete(`/candidates/${id}`);
