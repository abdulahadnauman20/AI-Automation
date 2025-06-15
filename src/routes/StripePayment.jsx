import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PhoneInput from '../components/PhoneInput';
import 'react-phone-input-2/lib/style.css';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { totalPrice, paymentIntentDomains } = state || {};
  const [clientSecret, setClientSecret] = useState("");
  const [intentId, setIntentId] = useState("");
  const [status, setStatus] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

  const [purchaseResult, setPurchaseResult] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const stripe = useStripe();
  const elements = useElements();

  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Address: "",
    City: "",
    StateProvince: "",
    PostalCode: "",
    Country: "",
    Phone: "",
    Email: "",
  });

  const [phoneCountryCode, setPhoneCountryCode] = useState("");

  // Function to format field names (e.g., "FirstName" -> "First Name")
  const formatLabel = (label) => {
    return label
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
      .replace(/^\w/, (char) => char.toUpperCase()); // Capitalize first letter
  };

  useEffect(() => {
    if (!paymentIntentDomains) return;

    fetch(`${import.meta.env.VITE_API_URL}EmailAccount/CreatePaymentIntent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Amount: totalPrice,
        Domains: [
          ...paymentIntentDomains.PremiumDomains.map(d => d.Name),
          ...paymentIntentDomains.NonPremiumDomains,
        ],
      }),
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
  }, [paymentIntentDomains, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { name: `${user.FirstName} ${user.LastName}` } },
    });

    if (result.error) {
      setStatus({ message: result.error.message, type: "error" });
      setTimeout(() => navigate("/email-domain"), 2500);
    } else if (result.paymentIntent.status === "succeeded") {
      setStatus({ message: "Payment successful! Please fill in your details.", type: "success" });
      setShowUserForm(true);
    }
  };

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = async () => {

    let phoneNumber = user.Phone || "";
    let formattedPhone = "";
    setStatus(null);

    if (phoneNumber.startsWith(phoneCountryCode)) {
      // Remove country code from phone number
      const restNumber = phoneNumber.slice(phoneCountryCode.length);
      formattedPhone = `+${phoneCountryCode}.${restNumber}`;
    } else {
      // fallback: just prefix and dot
      formattedPhone = `+${phoneCountryCode}.${phoneNumber}`;
    }

    const payload = {
      Domains: paymentIntentDomains,
      PaymentIntentId: intentId,
      UserDetails: {
        ...user,
        Phone: formattedPhone,
      },
    };

    console.log(payload)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}EmailAccount/PurchaseDomains`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setPurchaseResult(data);
      setShowUserForm(false);
      setShowConfirmation(true);
      
    } catch (err) {
      console.error("Error submitting purchase:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Domain Purchase</h2>
      {!purchaseResult && (<div><ul className="mb-4 text-gray-700">
        {paymentIntentDomains?.PremiumDomains?.map((d, idx) => (
          <li key={idx}>
            {d.Name} 
          </li>
        ))}
        {paymentIntentDomains?.NonPremiumDomains?.map((d, idx) => (
          <li key={idx}>{d}</li>
        ))}
      </ul>

      <p className="text-lg font-bold mb-4">Total: ${totalPrice}</p></div>)}
      

      {!showUserForm && !purchaseResult && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement className="p-3 border border-gray-300 rounded-md" />
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 cursor-pointer"
          >
            Pay Now
          </button>
        </form>
      )}

      {status && (
        <div
          className={`p-3 mt-4 rounded text-sm ${
            status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      {showUserForm && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium mb-2">Domain Owner Information</h3>
          {Object.keys(user).map((key) => (
  key === 'Phone' ? (
    <PhoneInput
      key={key}
      value={user[key]}
      onChange={(phone, country) => {
        setUser({ ...user, Phone: phone });
        setPhoneCountryCode(country.dialCode);
      }}
    />
  ) : (
    <input
      key={key}
      name={key}
      value={user[key]}
      onChange={handleUserChange}
      placeholder={key.split(/(?=[A-Z])/).join(' ')} // Adds space between camelCase words
      className="w-full px-4 py-2 border border-gray-300 rounded"
    />
  )
))}
          <button
            onClick={handleFinalSubmit}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 cursor-pointer"
          >
            Complete Purchase
          </button>
        </div>
      )}

      {showConfirmation && purchaseResult && (
  <div className="mt-6 space-y-4">
    <h3 className="text-lg font-semibold text-green-700">Purchase Result</h3>

    {purchaseResult.Purchased?.length > 0 && (
      <div>
        <p className="font-medium text-gray-800">Purchased Domains:</p>
        <ul className="list-disc pl-6 text-gray-700">
          {purchaseResult.Purchased?.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    )}

    {purchaseResult.Unpurchased?.length > 0 && (
      <div>
        <p className="font-medium text-red-600">Unpurchased Domains:</p>
        <ul className="list-disc pl-6 text-red-700">
          {purchaseResult.Unpurchased?.map((d, i) => {
           if (typeof d === "string") {
          return <li key={i}>{d}</li>;
        } else if (typeof d === "object") {
          return (
            <li key={i}>
              {d.Domain}: {d.Message}
            </li>
          );
        } else {
          return null;
        }
        })}
        </ul>
      </div>
    )}

    <button
      onClick={() => navigate("/email-domain")}
      className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 mt-4 cursor-pointer"
    >
      Back to Domain Search
    </button>
  </div>
)}

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
