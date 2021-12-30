import { gql } from "react-apollo";
import {
  GET_EXPERIENCE_HOURS_START,
  GET_EXPERIENCE_HOURS_SUCCESS,
  GET_EXPERIENCE_HOURS_ERROR,
} from "../constants";
import { change } from "redux-form";

const query = gql`
  query($listId: Int!, $startDate: String!, $endDate: String!, $status: String) {
    getExperienceHours(
      listId: $listId
      startDate: $startDate
      endDate: $endDate
      status: $status
    ) {
      id
      listId
      startTime
      endTime
      date
      dayOfMonth
      dayOfWeek
      frequency
      status
      availablePlaces
    }
  }
`;

export function getExperienceHours(listId, startDate, endDate, status) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: GET_EXPERIENCE_HOURS_START,
    });
    try {
      // Send Request to get listing data
      const { data } = await client.query({
        query,
        variables: { listId, startDate, endDate, status, preview: true },
        fetchPolicy: "network-only",
      });
      await dispatch(change("BookingForm", "experienceHours", data.getExperienceHours));
      dispatch({
        type: GET_EXPERIENCE_HOURS_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: GET_EXPERIENCE_HOURS_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}
