import { all } from "redux-saga/effects";

import imagesSagas from "./imageSaga";
import statsSagas from "./statsSagas";

export default function* rootSagas() {
  yield all([imagesSagas(), statsSagas()]);
}
