import { STATS } from "../contants";

const intialState = {};

const StatsReducer = (state = intialState, action) => {
  switch (action.type) {
    case STATS.LOAD:
      return {
        ...state,
        [action.id]: {
          isLoading: true,
          downloads: null,
          error: null
        }
      };
    case STATS.LOAD_SUCCESS:
      return {
        ...state,
        [action.id]: {
          isLoading: false,
          downloads: action.payload,
          error: null
        }
      };
    case STATS.LOAD_FAIL:
      return {
        ...state,
        [action.id]: {
          isLoading: false,
          downloads: action.payload,
          error: action.error
        }
      };

    default:
      return state;
  }
};

export default StatsReducer;
