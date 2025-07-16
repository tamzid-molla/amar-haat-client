import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/firebase/useAuth";
import { useNavigate } from "react-router";
import LoaderSVG from "../../components/shared/loaderSVG/LoaderSVG";

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Create Payment Intent on mount
    axiosSecure
      .post("/create-payment-intent", { amount: product.pricePerUnit })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      toast.error(confirmError.message);
    } else {
      toast.success("Payment Successful!");

      // Save Order to Database
      const orderData = {
        productName: product?.itemName,
        marketName:product?.market,
        productId: product._id,
        buyerEmail: user.email,
        price: product.pricePerUnit,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      await axiosSecure.post("/orders", orderData);
      navigate("/allProducts");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <CardElement className="border p-3 rounded-md shadow-sm" />
      <button disabled={!stripe || loading} className="bg-accent cursor-pointer text-white px-4 py-2 rounded-md shadow">
        {loading ? <LoaderSVG message={"Processing..."}></LoaderSVG> : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
