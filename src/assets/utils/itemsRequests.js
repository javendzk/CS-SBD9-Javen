import axios from 'axios';

const BASE_URL = 'https://javen-sbd6-backend.vercel.app';

export const getAllItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/item`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw new Error('Failed to fetch items. Please try again later.');
  }
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
