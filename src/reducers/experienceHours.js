import { GET_EXPERIENCE_HOURS_GENERAL_SUCCESS } from "../constants";

export default function getListingFields(state = {}, action) {
  switch (action.type) {
    case GET_EXPERIENCE_HOURS_GENERAL_SUCCESS:
      return {
        ...state,
        data: action.experienceHours,
      };
    default:
      return state;
  }
}
