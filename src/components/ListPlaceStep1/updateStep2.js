// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';

// Redux Action
import { getListingDataStep2 } from '../../actions/getListingDataStep2';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { getListingFieldsValues } from '../../actions/getListingFieldsValues';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';

async function updateStep2(values, dispatch) {

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $description:String,
    $title:String,
    $coverPhoto: Int
  ) {
      updateListingStep2 (
        id: $id,
        description:$description,
        title:$title,
        coverPhoto: $coverPhoto
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
      variables: values
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data.updateListingStep2.status == "success") {

    await dispatch(getListingDataStep2(values.id));
    await dispatch(manageListingSteps(values.id, 2));
    await dispatch(getListingFieldsValues("3", values.id));
    await dispatch(setLoaderComplete('updateListing'));
    history.push('/become-a-host/' + values.id + '/home');
  } else if (data.updateListingStep2.status == "notLoggedIn") {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default updateStep2;
