import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';


    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);


const Payment = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
        </div>
    );
};

export default Payment;