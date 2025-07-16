import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import PageLoader from "../../components/shared/pageLoader/PageLoader";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Public_Key);

const StripePayment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: product = [], isLoading } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <PageLoader></PageLoader>;

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-accent">💳 Complete Your Payment</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm product={product}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default StripePayment;
