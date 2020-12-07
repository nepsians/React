import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootSaga from "../sagas";

import rootReducer from "../reducers";
//import { IMAGES } from "../contants";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
