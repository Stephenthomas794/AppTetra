import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import "./Purchase.css"
const promise = loadStripe("pk_test_51IILoMEapMBXivyE4f883uSgRM5EsVCo2815ihzRKQzXbiqiQCcLQIcAyL20VoUSiu37OSwa369VhrSWkT0jzJOM00m8HrvHud");
export default function Purchase() {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
