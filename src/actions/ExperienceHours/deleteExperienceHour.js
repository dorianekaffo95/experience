import { gql } from 'react-apollo';

import {
  DELETE_EXPERIENCE_HOUR_START,
  DELETE_EXPERIENCE_HOUR_SUCCESS,
  DELETE_EXPERIENCE_HOUR_ERROR,
} from '../../constants';

// Toaster
import { toastr } from 'react-redux-toastr';

const mutation = gql`
  mutation($experienceHourId:Int!, $listId: Int!) {
    deleteExperienceHour(
        experienceHourId: $experienceHourId,
        listId: $listId
      ){
        status
      }
    }
  `;

export function deleteExperienceHour(experienceHourId, listId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: DELETE_EXPERIENCE_HOUR_START,
    });

    try {

      const { data } = await client.mutate({
        mutation,
        variables: { experienceHourId, listId },
      });

      if (data.deleteExperienceHour.status === "success") {

        dispatch({
          type: DELETE_EXPERIENCE_HOUR_SUCCESS,
        });

        toastr.success('Delete Setting Success', "Setting is deleted successfully");

        // dispatch(getAdminListingSettings(typeId));

      } else {
        if (data.deleteExperienceHour.status === '500') {
          toastr.error('Delete Experience Hour Failed', "It seems some reservations have been for this hour. Cancel the reservations before deleting if deletion is obligatory");
        }
        dispatch({
          type: DELETE_EXPERIENCE_HOUR_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_EXPERIENCE_HOUR_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
