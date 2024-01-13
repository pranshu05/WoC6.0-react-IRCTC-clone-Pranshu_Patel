import axios from 'axios';

const API_URL = 'http://localhost:5000';

const AuthService = {
  signUp: async (username, password) => {
    try {
      await axios.post(`${API_URL}/signup`, { username, password });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default AuthService;
