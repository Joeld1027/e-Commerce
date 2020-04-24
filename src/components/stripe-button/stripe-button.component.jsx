import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_FP8lHnFLzv8h5T2B1te9WpU5000t5Jhk7y';
	const onToken = (token) => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='Reign Clothing Ltd.'
			billingAddress
			shippingAddress
			img='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amoount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
