import { takeLatest, call, put, select } from "redux-saga/effects";
import { IMAGES } from "../contants";
import { fetchImages } from "../api";
import { setImages, setError } from "../actions";

export const getPage = state => state.ImageReducer.pageNo;

export function* hanldeImagesLoad() {
  try {
    const page = yield select(getPage);
    const images = yield call(fetchImages, page);
    yield put(setImages(images));
  } catch (error) {
    yield put(setError);
  }
}

export default function* watchImagesLoad() {
  yield takeLatest(IMAGES.LOAD, hanldeImagesLoad);
}
