import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const getPortfolioData = async () => {
  try {
    const response = await axios.get(`${API_URL}/portfolio`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
};

export const sendContactMessage = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
