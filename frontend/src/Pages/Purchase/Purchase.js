import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";
import "./Purchase.css"
const promise = loadStripe("pk_test_51IILoMEapMBXivyE4f883uSgRM5EsVCo2815ihzRKQzXbiqiQCcLQIcAyL20VoUSiu37OSwa369VhrSWkT0jzJOM00m8HrvHud");


export default function Purchase(props) {

  return (
    <div className="App">
    <h1> You are purchasing item: {props.projectID} </h1>
    <h2> Called: { props.projectName[0] } </h2>

      <Elements stripe={promise}>
        <CheckoutForm projectName={props.projectName[0]} projectID={props.projectID}/>
      </Elements>
    </div>
  );
}
