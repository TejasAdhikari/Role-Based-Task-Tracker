import axios from 'axios';

// Define the base URL for the API
const API_URL = 'http://localhost:5000/api/tasks';

// Function to get the authentication header
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'x-auth-token': token
        }
    };
};

// Function to get all tasks
export const getTasks = async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
};

// Function to create a new task
export const createTask = async (task) => {
  const response = await axios.post(API_URL, task, getAuthHeader());
  return response.data;
};

// Function to update an existing task
export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/${id}`, task, getAuthHeader());
  return response.data;
};

// Function to delete a task
export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};