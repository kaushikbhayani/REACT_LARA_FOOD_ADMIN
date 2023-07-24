import { take, takeEvery, takeLatest, put, all, delay, fork, call } from '@redux-saga/core/effects';
import * as types from './actiontTypes';
import {
  getDataUsersError,
  getDataUsersSuccess,
  loginUsersSuccess,
  loginUsersError,
  createUsersSuccess,
  createUsersError,
  deleteUsersSuccess,
  deleteUsersError,
  updateUsersError,
  // ========image======
  imageGetSuccess,
  imageDeleteSuccess,
  imageDeleteError,
  imageUploadSuccess,
  imageUploadError,
} from './actions';
import {
  DataGetUsersApi,
  loginUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  imageGetApi,
  imageUploadApi,
  imageDleteApi,
} from './api';

function* onDataGetUsersStartAsync() {
  try {
    const response = yield call(DataGetUsersApi);

    if (response.status === 200) {
      yield put(getDataUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(getDataUsersError(error.response.data));
  }
}

function* onLoginUserStartAsync({ payload }) {
  try {
    const response = yield call(loginUsersApi, payload);

    if (response.status === 200) {
      yield put(loginUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loginUsersError(error.response.data));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);

    if (response.status === 200) {
      yield put(createUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(createUsersError(error.response.data));
  }
}

function* onDeletUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);

    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUsersSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUsersError(error.response.data));
  }
}

function* onUpdateUserStartAsync({ payload: { id, data } }) {
  try {
    const response = yield call(updateUserApi, id, data);
  } catch (error) {
    yield put(updateUsersError(error.response.data));
  }
}

// =================Image================================

function* onImageGetStartAsync() {
  try {
    const response = yield call(imageGetApi);

    if (response.status === 200) {
      yield put(imageGetSuccess(response.data));
    }
  } catch (error) {
    yield put(getDataUsersError(error.response.data));
  }
}

function* onImageUploadStartAsync({ payload }) {
  try {
    const response = yield call(imageUploadApi, payload);

    if (response.status === 200) {
      yield put(imageUploadSuccess(response.data));
    }
  } catch (error) {
    yield put(imageUploadError(error.response.data));
  }
}

function* onImageDeleteStartAsync(imageId) {
  try {
    const response = yield call(imageDleteApi, imageId);

    if (response.status === 200) {
      yield delay(500);
      yield put(imageDeleteSuccess(imageId));
    }
  } catch (error) {
    yield put(imageDeleteError(error.response.data));
  }
}

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

function* onDataGetUsers() {
  yield takeEvery(types.GET_DATA_USERS_START, onDataGetUsersStartAsync);
}

function* onLogineUser() {
  yield takeLatest(types.LOGIN_USERS_START, onLoginUserStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USERS_START, onCreateUserStartAsync);
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USERS_START);
    yield call(onDeletUserStartAsync, userId);
  }
}

function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USERS_START, onUpdateUserStartAsync);
}

// =================Image================================
function* onImageGet() {
  yield takeEvery(types.IMAGE_GET_START, onImageGetStartAsync);
}

function* onImageUpload() {
  yield takeLatest(types.IMAGE_UPLOAD_START, onImageUploadStartAsync);
}

function* onImageDelete() {
  while (true) {
    const { payload: imageId } = yield take(types.IMAGE_DELETE_START);
    yield call(onImageDeleteStartAsync, imageId);
  }
}
// =================Image================================

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

const userSagas = [
  fork(onDataGetUsers),
  fork(onLogineUser),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
  fork(onImageGet),
  fork(onImageUpload),
  fork(onImageDelete),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
