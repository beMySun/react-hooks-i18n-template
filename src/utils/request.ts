import axios from 'axios';

export const baseURL = '/';

export const createRequest = ({ timeout = 10 * 1000 } = {}) => {
  const request = axios.create({
    baseURL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRF-TOKEN',
    timeout,
  });

  request.interceptors.response.use(
    response => {
      const { data } = response;
      return data;
    },
    error => Promise.reject(error)
  );
  return request;
};

export default createRequest();
