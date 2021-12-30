// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';


// Redux Action
import { getListingData } from '../../actions/getListing';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { getListingFieldsValues } from '../../actions/getListingFieldsValues';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';

async function update(values, dispatch) {

  let bedTypes = JSON.stringify(values.bedTypes);
  let variables = Object.assign({}, values, { bedTypes });

  console.log("This is the value: ", values, variables);

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $roomType:String,
    $houseType:String,
    $residenceType:String,
    $bedrooms:String,
    $buildingSize:String,
    $bedType:String,
    $beds:Int,
    $personCapacity:Int,
    $adultCapacity:Int,
    $teenCapacity:Int,
    $childOrYoungerCapacity:Int,
    $bathrooms:Float,
    $bathroomType:String,
    $country:String,
    $street:String,
    $buildingName:String,
    $city:String,
    $state:String,
    $zipcode:String,
  	$lat: Float,
  	$lng: Float,
    $isMapTouched: Boolean,
    $spokenLanguages: [Int],
    $experienceTypes: [Int],
    $plusesIncluded: [Int],
    $visitWithOwner: Boolean,
    $privateOrCollective: String,
    $familyWelcome: String,
    $amenities: [Int],
    $safetyAmenities: [Int],
    $spaces: [Int],
    $bedTypes: String,
  ) {
      updateListing (
        id: $id,
        roomType:$roomType,
        houseType:$houseType,
        residenceType: $residenceType,
        bedrooms: $bedrooms,
        buildingSize: $buildingSize
        bedType: $bedType
        beds: $beds
        personCapacity: $personCapacity
        adultCapacity: $adultCapacity,
        teenCapacity: $teenCapacity,
        childOrYoungerCapacity: $childOrYoungerCapacity,
        bathrooms: $bathrooms
        bathroomType: $bathroomType
        country: $country
        street: $street
        buildingName: $buildingName
        city: $city
        state: $state
        zipcode: $zipcode
        lat: $lat
        lng: $lng
        isMapTouched: $isMapTouched,
        spokenLanguages: $spokenLanguages,
        experienceTypes: $experienceTypes,
        plusesIncluded: $plusesIncluded,
        visitWithOwner: $visitWithOwner,
        privateOrCollective: $privateOrCollective,
        familyWelcome: $familyWelcome,
        amenities: $amenities,
        safetyAmenities: $safetyAmenities,
        spaces: $spaces,
        bedTypes: $bedTypes,
      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data.updateListing.status == "success") {
    await dispatch(getListingData(values.id));
    await dispatch(manageListingSteps(values.id, 1));
    await dispatch(getListingFieldsValues("2", values.id));
    await dispatch(setLoaderComplete('updateListing'));

    history.push('/become-a-host/' + values.id + '/home');
  } else if (data.updateListing.status == "notLoggedIn") {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default update;
