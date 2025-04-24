import axios from 'axios';

// Define the base URL for the API
const API_URL = 'http://localhost:5000/api';

// Function to get all users
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/auth`);
  return response.data;
};

// Function to login a user
export const login = async (userId) => {
  const response = await axios.post(`${API_URL}/auth/login`, { userId });
  return response.data;
};