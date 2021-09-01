import axios from 'axios';

export const axiosCreate = (basePath) => {
  return axios.create({
    baseURL: `http://localhost:8080/${basePath}`,
  });
};
