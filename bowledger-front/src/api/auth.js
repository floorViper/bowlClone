import axios from 'axios';

export const localLogin = ({ userName, passWord }) => {
  console.log('authapi', userName, passWord);
  return axios.post('/auth/process/login', {
    id: userName,
    password: passWord
  });
};
export const checkLogin = () => axios.get('/auth/process/loginCheck');
export const localLogout = () => axios.get('/auth/process/logout');

export const userPermissionList = () =>
  axios.get('/auth/process/userPermissionPage2');
export const userPermissionReq = param =>
  axios.post('/auth/process/userPermission', param);
