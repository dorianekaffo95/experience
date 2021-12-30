import {
    LOADING_STORE_SEARCH_RESULTS,
    FETCH_STORE_SEARCH_RESULTS_SUCCESS,
    GET_STORE_SEARCH_SETTINGS_SUCCESS,
  } from '../constants';
  
  export default function search(state = {}, action) {
    switch (action.type) {
  
      case LOADING_STORE_SEARCH_RESULTS:
        return {
          ...state,
          isResultLoading: action.payload.isResultLoading,
        };
  
      case FETCH_STORE_SEARCH_RESULTS_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          count: Number(action.payload.data.length),
          isResultLoading: action.payload.isResultLoading,
        };
  
      case GET_STORE_SEARCH_SETTINGS_SUCCESS:
        return {
          ...state,
          searchSettings: action.payload.data,
        };
      default:
        return state;
    }
  }