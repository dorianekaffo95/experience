import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.country) {
    errors.country = messages.required;
  }

  if (!values.city) {
    errors.city = messages.required;
  }

  if (!values.state) {
    errors.state = messages.required;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  }

  if (!values.payEmail) {
    errors.payEmail = messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.payEmail)) {
    errors.payEmail = messages.payoutError5;
  }

  if (!values.currency) {
    errors.currency = messages.required;
  }

  return errors
}

export default validate;