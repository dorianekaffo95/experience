import { gql } from 'react-apollo';
import { reset, change } from 'redux-form';
import { hideLoading } from 'react-redux-loading-bar';

import {
  SEARCH_LISTING_START,
  SEARCH_LISTING_SUCCESS,
  SEARCH_LISTING_ERROR,
} from '../constants';

import { getSearchResults } from './getSearchResults';

// $dates: String,
const query = gql`
  query(
      $personCapacity: Int,
      $startDate: String,
      $endDate: String,
      $startTime: String,
      $endTime: String,
      $adults: Int,
      $teens: Int,
      $kids: Int,
      $visitWithOwner: Boolean,
      $currentPage: Int,
      $geography: String,
      $geoType: String,
      $lat: Float,
      $lng: Float,
      $sw_lat: Float, 
      $sw_lng: Float, 
      $ne_lat: Float,
      $ne_lng: Float,
    ){
      SearchListing(
        personCapacity: $personCapacity,
        startDate: $startDate,
        endDate: $endDate,
        startTime: $startTime,
        endTime: $endTime,
        adults: $adults,
        teens: $teens,
        kids: $kids,
        visitWithOwner: $visitWithOwner,
        currentPage: $currentPage,
        geography: $geography,
        geoType: $geoType,
        lat: $lat,
        lng: $lng,
        sw_lat: $sw_lat, 
        sw_lng: $sw_lng, 
        ne_lat: $ne_lat, 
        ne_lng: $ne_lng,
      ) {
        count
        results {
          id
          title
          personCapacity
          adultCapacity
          teenCapacity
          childOrYoungerCapacity
          visitWithOwner
          lat
          lng
          beds
          bookingType
          coverPhoto
          reviewsCount,
          reviewsStarRating,
          listPhotos {
            id
            name
            type
            status
          }
          listingData {
            basePrice
            currency,
            duration
          }
          experienceTypes {
            listsettings {
              id
              itemName
              itemDescription
            }
          }
          settingsData {
            listsettings {
              id
              itemName
              itemDescription
            }
          }
          wishListStatus
          isListOwner
        }
      }
    }
`;

export function searchListing({ personCapacity, startDate, endDate, startTime, endTime, adults, teens, kids, familyWelcome, visitWithOwner, geography, currentPage, geoType, lat, lng, sw_lat, sw_lng, ne_lat, ne_lng }) {
  return async (dispatch, getState, { client }) => {
    dispatch({ type: SEARCH_LISTING_START });
    dispatch(reset('SearchForm'));

    try {
      const { data } = await client.query({
        query,
        variables: {
          personCapacity,
          startDate,
          endDate,
          startTime,
          endTime,
          adults,
          teens,
          kids,
          visitWithOwner,
          currentPage,
          geography,
          geoType,
          lat,
          lng,
          sw_lat,
          sw_lng,
          ne_lat,
          ne_lng,
        },
        fetchPolicy: 'network-only',
      });
      if (data.SearchListing) {
        dispatch({ type: SEARCH_LISTING_SUCCESS });
        await dispatch(change('SearchForm', 'personCapacity', personCapacity));
        // await dispatch(change('SearchForm', 'dates', dates));
        await dispatch(change('SearchForm', 'startDate', startDate));
        await dispatch(change('SearchForm', 'endDate', endDate));
        await dispatch(change('SearchForm', 'startTime', startTime));
        await dispatch(change('SearchForm', 'endTime', endTime));
        await dispatch(change('SearchForm', 'adults', adults));
        await dispatch(change('SearchForm', 'teens', teens));
        await dispatch(change('SearchForm', 'kids', kids));
        await dispatch(change('SearchForm', 'familyWelcome', familyWelcome));
        await dispatch(change('SearchForm', 'visitWithOwner', visitWithOwner));
        await dispatch(change('SearchForm', 'geography', geography));
        await dispatch(change('SearchForm', 'currentPage', currentPage));
        await dispatch(change('SearchForm', 'geoType', geoType));
        await dispatch(change('SearchForm', 'lat', lat));
        await dispatch(change('SearchForm', 'lng', lng));
        await dispatch(change('SearchForm', 'searchByMap', false));
        await dispatch(change('SearchForm', 'sw_lat', sw_lat));
        await dispatch(change('SearchForm', 'sw_lng', sw_lng));
        await dispatch(change('SearchForm', 'ne_lat', ne_lat));
        await dispatch(change('SearchForm', 'ne_lng', ne_lng));
        await dispatch(change('SearchForm', 'initialLoad', true));
        await dispatch(change('SearchForm', 'markerHighlight', {}));
        // Default Map Show
        await dispatch(change('SearchForm', 'showMap', true));
        dispatch(getSearchResults(data.SearchListing));
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch({
        type: SEARCH_LISTING_ERROR,
        payload: {
          error,
        },
      });
      dispatch(hideLoading());
      return false;
    }

    return true;
  };
}
