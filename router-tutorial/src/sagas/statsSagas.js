import { take, fork, call, put, actionChannel } from "redux-saga/effects";

import { IMAGES, STATS } from "../contants";
import { fetchImageStats } from "../api";
import { loadStats, setStats, setStatsError } from "../actions";

function* handleStatsRequest(id) {
  try {
    yield put(loadStats(id));
    const result = yield call(fetchImageStats, id);
    yield put(setStats(id, result.downloads.total));
  } catch (error) {
    yield put(setStatsError(id, error));
  }
}

export default function* watchStatsRequest() {
  const channel = yield actionChannel([STATS.LOAD, STATS.LOAD_SUCCESS]);

  //console.warn("CCHannelsssssssssssss:", channel);

  const action = yield take(channel);
  console.warn("actions:::::::::", action);
  while (true) {
    const { payload } = yield take(IMAGES.LOAD_SUCCESS);

    for (var i = 0; i < payload.length; i++) {
      yield fork(handleStatsRequest, payload[i].id);
    }
  }
}
