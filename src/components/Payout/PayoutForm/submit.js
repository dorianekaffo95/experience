import { addPayout } from '../../../actions/Payout/addPayoutAction';

async function submit(values, dispatch) {
	let paymentType = values.methodId;
	// PayPal
	let payEmail = paymentType == 1 ? values.payEmail : values.email;
	// Stripe
	let firstname = paymentType == 2 ? values.firstname : null;
	let lastname = paymentType == 2 ? values.lastname : null;
	let accountNumber = paymentType == 2 ? values.accountNumber : null;
	let routingNumber = paymentType == 2 ? values.routingNumber : null;
	let ssn4Digits = paymentType == 2 ? values.ssn4Digits : null;

	dispatch(addPayout(
		values.methodId,
		payEmail,
		values.address1,
		values.address2,
		values.city,
		values.state,
		values.country,
		values.zipcode,
		values.currency,
		firstname,
		lastname,
		accountNumber,
		routingNumber,
		ssn4Digits,
		values.day,
		values.month,
		values.year
	)
	);
	//dispatch(reset('PayoutForm'));
}

export default submit;
