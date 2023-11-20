import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { FormContainer, PaymentFormContainer } from "./PaymentForm.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";

export default function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const amount = useSelector(selectCartTotal);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    if (amount < 1) {
      alert("Amount is not positive!");
      setIsProcessing(false);
    }
    const res = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    });
    const data = await res.json();
    const clientSecret = data.paymentIntent.client_secret;
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessing(false);
    if (paymentResult.paymentIntent.status === "succeeded") {
      setIsProcessing(false);
      alert("Payment Successful!");
    }
    if (paymentResult.paymentIntent.error) alert(paymentResult.error);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={handlePayment}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button
          isLoading={isProcessing}
          style={{ marginTop: "26px" }}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
}
