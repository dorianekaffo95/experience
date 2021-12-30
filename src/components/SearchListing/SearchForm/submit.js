// Fetch request
import fetch from '../../../core/fetch';

// Redux
import { getSearchResults, loadingSearchResults } from '../../../actions/getSearchResults';

async function submit(values, dispatch) {
  dispatch(loadingSearchResults());
  const query =
    `query(
      $personCapacity: Int,
      $startDate: String,
      $endDate: String,
      $startTime: String,
      $endTime: String,
      $adults: Int,
      $teens: Int,
      $kids: Int,
      $visitWithOwner: Boolean,
      $spokenLanguages: [Int],
      $plusesIncluded: [Int],
      $experienceTypes: [Int],
      $currentPage: Int,
      $lat: Float,
      $lng: Float,
      $roomType: [Int],
      $bedrooms: Int,
      $bathrooms: Int,
      $beds: Int,
      $familyWelcome: String,
      $amenities: [Int],
      $spaces: [Int],
      $houseRules: [Int],
      $priceRange: [Int],
      $geography: String,
      $bookingType: String,
      $geoType: String,
      $searchByMap: Boolean,
      $sw_lat: Float,
      $sw_lng: Float,
      $ne_lat: Float,
      $ne_lng: Float
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
        currentPage: $currentPage
        lat: $lat,
        lng: $lng,
        roomType: $roomType,
        bedrooms: $bedrooms,
        bathrooms: $bathrooms,
        beds: $beds,
        amenities: $amenities,
        familyWelcome: $familyWelcome,
        spokenLanguages: $spokenLanguages,
        plusesIncluded: $plusesIncluded,
        experienceTypes: $experienceTypes,
        spaces: $spaces,
        houseRules: $houseRules,
        priceRange: $priceRange,
        geography: $geography,
        bookingType: $bookingType,
        geoType: $geoType,
        searchByMap: $searchByMap,
        sw_lat: $sw_lat,
        sw_lng: $sw_lng,
        ne_lat: $ne_lat,
        ne_lng: $ne_lng
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
          coverPhoto
          bookingType
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
            currency
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


  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: values,
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data && data.SearchListing) {
    dispatch(getSearchResults(data.SearchListing));
  }
}

export default submit;
