import request from '@/utils/request';

export const getToken = () => request.get('/api/csrftoken');
