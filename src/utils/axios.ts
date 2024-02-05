import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

const api = axios.create({ baseURL: apiURL });


api.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'There is an error!'
    )
);



export const axiosMockup = axios.create({ baseURL: apiURL });

export default api;
