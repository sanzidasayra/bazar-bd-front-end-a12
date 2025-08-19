import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../../components/Shared/Spinner';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const axiosSecure = useAxiosSecure();
  const { productId } = useParams();
  const { user } = useAuth(); 
  const buyerEmail = user ? user.email : 'guest@example.com';  
  const navigate = useNavigate();

  // ✅ Fetch product data first
  const { isPending, data: productInfo = {} } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId}`);
      return res.data;
    }
  });

  if (isPending) {
    return <Spinner />;
  }

  console.log("Fetched product:", productInfo);

  // ✅ Calculate latest price after productInfo is ready
const latestPrice =
  productInfo?.prices && productInfo.prices.length > 0
    ? productInfo.prices.reduce((closest, current) => {
        const today = new Date();
        const currentDiff = Math.abs(new Date(current.date) - today);
        const closestDiff = Math.abs(new Date(closest.date) - today);
        return currentDiff < closestDiff ? current : closest;
      }).price
    : productInfo?.pricePerUnit;

const amount = parseInt(latestPrice, 10) || 0; // fallback 0
const amountInPoysha = amount * 100;
console.log("Amount in Poysha:", amountInPoysha);

  // ✅ Handle Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    } else {
      setErrorMessage(""); 
    }

    try {
      const res = await axiosSecure.post('/create-payment-intent', {
        amountInPoysha,
        productId
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id, 
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful! Redirecting to home...');

        const purchaseInfo = {
          productId: productInfo._id,
          buyerEmail,
          price: latestPrice,
          productName: productInfo.itemName,
          marketName: productInfo.marketName,
          date: new Date(),
          transactionId: result.paymentIntent.id
        };

        try {
          await axiosSecure.post('/orders', purchaseInfo);
          toast.success('Purchase saved!');
        } catch (error) {
          console.error('Failed to save purchase:', error);
          toast.error(`Error: ${error.response?.data?.error || 'Unknown error'}`);
        }

        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      console.error('Payment Intent creation failed:', error);
      toast.error('Payment failed! Try again later.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto mt-10 mb-10  "
    >
      <CardElement className="p-2 border border-gray-300 rounded" />
      
      <div className="text-center">
        <button
          type="submit"
          className="mt-4 btn btn-neutral"
          disabled={!stripe}
        >
          Pay <span className="text-2xl font-semibold ml-1 -mt-2">৳</span>{amount}
        </button>

        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default PaymentForm;
