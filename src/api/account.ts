import axios from '@/utils/request';

export const getToken = () => axios.get('/api/csrftoken');

export const login = async (account: string, password: string) => {
  await getToken();
  return axios.post('/api/login', { account, password });
};

export const logout = () => {
  axios.post('/api/logout');
  // localStorage.clear();
  localStorage.removeItem('reduxState');
};

export const changePassword = (user_id: any, current_password: string, new_password: string) => axios.put(
  `/api/users/${user_id}/passwd`,
  {
    user_id,
    current_password,
    new_password,
  },
);

export const forgetPassword = (email: string, key: string, value: string) => axios.post('/api/users/forget_password', {
  email,
  captcha_id: key,
  captcha_value: value,
});

export const resetPassword = (email: string, token: string, new_password: string) => axios.post('/api/users/reset_password', {
  email,
  token,
  new_password,
});

export const getUserMark = (params?: any) => {
  const apiUrl = '/api/mark_enum_all';
  return axios.get(apiUrl, { params });
};

export const setUserMark = (params?: any) => {
  const apiUrl = '/api/mark_enum';
  return axios.get(apiUrl, { params });
};
