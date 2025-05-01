import axios from 'axios';

const BASE_URL = 'https://javen-sbd6-backend.vercel.app';

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, null, {
      params: { name, email, password }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw new Error('Registration failed. Please try again later.');
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, null, {
      params: { email, password }
    });
    
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.payload));
    }
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw new Error('Login failed. Please try again later.');
  }
};

export const isLoggedIn = () => {
  return localStorage.getItem('user') !== null;
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
