import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RUlirFYxVVbdtFSBryjfLzYPCE2K0w758wXvx2gSmThmB8XR9wkliFHVluvYLCZTZltdMrx8uXRixHQuxfOwDvV005PUzCvDf");

const CheckoutForm = () => {
  const { state } = useLocation();
  const { domains, totalPrice } = state || { domains: [], totalPrice: 0 };
  const [clientSecret, setClientSecret] = useState("");
  const [intentId, setIntentId] = useState("");
  const [status, setStatus] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
  const domainNames = domains.map(d => d.name); // Ensure only strings

  fetch("http://localhost:4000/EmailAccount/CreatePaymentIntent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Amount: totalPrice, Domains: domainNames }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setClientSecret(data.clientSecret);
        setIntentId(data.intentId);
      } else {
        setStatus({ message: "Failed to create payment intent", type: "error" });
      }
    })
    .catch(err => {
      console.error("Error creating PaymentIntent:", err);
      setStatus({ message: "Error creating payment intent", type: "error" });
    });
}, [domains, totalPrice]);


  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { name: "Customer" } },
    });

    if (result.error) {
      setStatus({ message: result.error.message, type: "error" });
    } else if (result.paymentIntent.status === "succeeded") {
      setStatus({ message: "Payment successful! Thank you.", type: "success" });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Confirm Payment</h2>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Selected Domains:</h4>
        <ul className="list-disc pl-5 text-gray-700">
          {domains.map((d, idx) => (
            <li key={idx}>
              {d.name}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-lg font-bold mb-4">Total: ${totalPrice}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-3 border border-gray-300 rounded-md" />
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
        >
          Pay Now
        </button>
        {status && (
          <div
            className={`p-3 rounded text-sm ${
              status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default function StripePaymentWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
