import { IMAGES } from "../contants";

const intialState = {
  isLoading: false,
  response: null,
  error: null,
  pageNo: 1
};

const ImageReducer = (state = intialState, action) => {
  switch (action.type) {
    case IMAGES.LOAD:
      return { ...state, isLoading: true };
    case IMAGES.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.payload,
        pageNo: state.pageNo + 1
      };
    case IMAGES.LOAD_FAIL:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default ImageReducer;
