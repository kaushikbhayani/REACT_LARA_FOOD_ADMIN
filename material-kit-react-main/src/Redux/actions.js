import {
  GET_DATA_USERS_START,
  GET_DATA_USERS_SUCCESS,
  GET_DATA_USERS_ERROR,
  LOGIN_USERS_START,
  LOGIN_USERS_SUCCESS,
  LOGIN_USERS_ERROR,
  CREATE_USERS_START,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_ERROR,
  DELETE_USERS_START,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  UPDATE_USERS_START,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_ERROR,
  // =======image========
  IMAGE_GET_START,
  IMAGE_GET_SUCCESS,
  IMAGE_GET_ERROR,
  IMAGE_UPLOAD_START,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_DELETE_START,
  IMAGE_DELETE_SUCCESS,
  IMAGE_DELETE_ERROR,
} from './actiontTypes';

// ============================================ACTION START===========================================
export const getDataUsersStart = () => ({
  type: GET_DATA_USERS_START,
});

export const getDataUsersSuccess = (users) => ({
  type: GET_DATA_USERS_SUCCESS,
  payload: users,
});

export const getDataUsersError = (error) => ({
  type: GET_DATA_USERS_ERROR,
  payload: error,
});
// ============================================ACTION END================================================

// ============================================ACTION START===========================================
export const loginUsersStart = (user) => ({
  type: LOGIN_USERS_START,
  payload: user,
});

export const loginUsersSuccess = () => ({
  type: LOGIN_USERS_SUCCESS,
});

export const loginUsersError = (error) => ({
  type: LOGIN_USERS_ERROR,
  payload: error,
});
// ============================================ACTION END================================================

export const createUserStart = (user) => ({
  type: CREATE_USERS_START,
  payload: user,
});

export const createUsersSuccess = () => ({
  type: CREATE_USERS_SUCCESS,
});

export const createUsersError = (error) => ({
  type: CREATE_USERS_ERROR,
  payload: error,
});

// ============================================ACTION END==================================================

export const deleteUserStart = (userId) => ({
  type: DELETE_USERS_START,
  payload: userId,
});

export const deleteUsersSuccess = (userId) => ({
  type: DELETE_USERS_SUCCESS,
  payload: userId,
});

export const deleteUsersError = (error) => ({
  type: DELETE_USERS_ERROR,
  payload: error,
});

// ============================================ACTION END=================================================

export const updateUserStart = (userInfo) => ({
  type: UPDATE_USERS_START,
  payload: userInfo,
});

export const updateUsersSuccess = () => ({
  type: UPDATE_USERS_SUCCESS,
});

export const updateUsersError = (error) => ({
  type: UPDATE_USERS_ERROR,
  payload: error,
});

// ================= image===========================ACTION END===================================================
export const imageGetStart = () => ({
  type: IMAGE_GET_START,
});

export const imageGetSuccess = (images) => ({
  type: IMAGE_GET_SUCCESS,
  payload: images,
});

export const imageGetError = (error) => ({
  type: IMAGE_GET_ERROR,
  payload: error,
});

// ============================================ACTION END===================================================
export const imageUploadStart = (image) => ({
  type: IMAGE_UPLOAD_START,
  payload: image,
});

export const imageUploadSuccess = () => ({
  type: IMAGE_UPLOAD_SUCCESS,
});

export const imageUploadError = (error) => ({
  type: IMAGE_UPLOAD_ERROR,
  payload: error,
});
// ============================================ACTION END===================================================
export const imageDeleteStart = (imageId) => ({
  type: IMAGE_DELETE_START,
  payload: imageId,
});

export const imageDeleteSuccess = (imageId) => ({
  type: IMAGE_DELETE_SUCCESS,
  payload: imageId,
});

export const imageDeleteError = (error) => ({
  type: IMAGE_DELETE_ERROR,
  payload: error,
});
// ============================================ACTION END===================================================
