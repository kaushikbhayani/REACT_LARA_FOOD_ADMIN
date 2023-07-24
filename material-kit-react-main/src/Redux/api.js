import axios from 'axios';

export const DataGetUsersApi = async () => axios.get('http://127.0.0.1:8000/api/user');

export const createUserApi = async (user) => axios.post('http://127.0.0.1:8000/api/register', user);

export const loginUsersApi = async (user) => axios.post('http://127.0.0.1:8000/api/login', user);

export const deleteUserApi = async (userId) => axios.delete(`http://localhost:8000/users/${userId}`);

export const updateUserApi = async (userId, userInfo) => axios.put(`http://localhost:8000/users/${userId}`, userInfo);
// ==============================Image===========================================

export const imageGetApi = async () => axios.get('http://127.0.0.1:8000/api/show');
export const imageUploadApi = async (image) => axios.post('http://127.0.0.1:8000/api/uploads', image);
export const imageDleteApi = async (imageId) => axios.delete(`http://127.0.0.1:8000/api/show/${imageId}`);
