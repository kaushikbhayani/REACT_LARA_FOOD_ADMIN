import {
  GET_DATA_USERS_START,
  GET_DATA_USERS_SUCCESS,
  GET_DATA_USERS_ERROR,
  CREATE_USERS_START,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_ERROR,
  DELETE_USERS_ERROR,
  DELETE_USERS_START,
  DELETE_USERS_SUCCESS,
  UPDATE_USERS_START,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_ERROR,
  LOGIN_USERS_START,
  LOGIN_USERS_ERROR,
  LOGIN_USERS_SUCCESS,
  // =====image=========
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

const initialState = {
  users: [],
  loading: false,
  error: null,
  uploadfile: [],
};

const usersReduce = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_USERS_START:
    case LOGIN_USERS_START:
    case CREATE_USERS_START:
    case DELETE_USERS_START:
    case UPDATE_USERS_START:
    case IMAGE_GET_START:
    case IMAGE_UPLOAD_START:
    case IMAGE_DELETE_START:
      return {
        ...state,
        loading: true,
      };
    // =================IMAGE==========================
    case IMAGE_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    // =================IMAGE==========================

    case GET_DATA_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case CREATE_USERS_SUCCESS:
    case LOGIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };

    case UPDATE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_DATA_USERS_ERROR:
    case LOGIN_USERS_ERROR:
    case CREATE_USERS_ERROR:
    case DELETE_USERS_ERROR:
    case UPDATE_USERS_ERROR:
    case IMAGE_GET_ERROR:
    case IMAGE_UPLOAD_ERROR:
    case IMAGE_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //  =========Image Api================

    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        images: state.images.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default usersReduce;
