import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import PaymentForm from '../components/PaymentForm';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [finalTotal, setFinalTotal] = useState('');
  const [cookie] = useCookies(['user']);
  const navigate = useNavigate();
  const createPaymentIntent = async (token) => {
    try {
      const { data } = await axios.post(
        '/api/payment/create-payment-intent',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClientSecret(data.clientSecret);
      setFinalTotal(data.totalAfterDiscount);
    } catch (err) {
      navigate('/');
    }
  };

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    createPaymentIntent(cookie.user.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm finalTotal={finalTotal} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
