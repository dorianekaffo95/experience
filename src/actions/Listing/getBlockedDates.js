import { gql } from 'react-apollo';
import { change } from 'redux-form';

import {
    GET_BLOCKED_DATE_START,
    GET_BLOCKED_DATE_SUCCESS,
    GET_BLOCKED_DATE_ERROR,
} from '../../constants';

const query = gql`
    query ($listId: Int!) {
        getBlockedDates(listId: $listId) {
            listId
            blockedDates
        }
    }
`

export function getBlockedDates(listId) {

    return async(dispatch, getState, {client}) => {
        dispatch({
            type: GET_BLOCKED_DATE_START, 
            payload: {
                loading: true
            }
        });

        try {
            const { data } = await client.query({
                query,
                variables: {
                  listId
                },
            });

            const blockedDates = [];

            data.getBlockedDates.forEach((item) => {
                blockedDates.push(new Date(item.blockedDates));
            });

            console.log("Selected dates: ", data.getBlockedDates, blockedDates);

            await dispatch(change('ListPlaceStep3', 'availableDates', blockedDates));

            dispatch({
                type: GET_BLOCKED_DATE_SUCCESS, 
                payload: {
                    loading: false
                }
            });

            return {
                data
            };
        } catch (error) {
            dispatch({
                type: GET_BLOCKED_DATE_ERROR, 
                payload: {
                    error
                }
            });
        }

        return false;
    };
}