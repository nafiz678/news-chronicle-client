import CheckoutForm from "@/components/CheckoutForm";
import PlansSection from "@/components/PlansSection";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Helmet } from "react-helmet-async";


// check the file later
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const SubscriptionPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1"); // Default 1 minute
  const [price, setPrice] = useState(5); // Default price for 1 minute


  // Handle subscription period change
  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);

    // Set price based on the selected period
    if (period === "4.99") {
      setPrice(5); 0
    } else if (period === "19.99") {
      setPrice(20); 0
    } else if (period === "29.99") {
      setPrice(30); 0
    }
  };

  // Navigate to the payment page when user clicks the "Subscribe" button
  // const handleSubscription = () => {
  //   console.log("Payment page/modal");

  // };

  return (
    <div className="pb-20 bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 text-white">
      <Helmet>
        <title>Subscription || News Chronicle</title>
      </Helmet>
      {/* Banner Section */}
      <section className="relative pt-24 pb-16 px-4 text-center">
        <div className="absolute inset-0 "></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Subscribe to Access Premium News
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Stay updated with exclusive content and insights.
          </p>
        </div>
      </section>

      <section>
        <PlansSection></PlansSection>
      </section>

      {/* Subscription Plan Section */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Choose Your Plan</h2>

            {/* Price Display */}
            <div className="text-xl font-bold text-gray-800 ">
              <span className="text-gray-700">Total Price: </span>${price}
            </div>
          </div>

          {/* Dropdown to select subscription period */}
          <select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="w-full px-4 py-2 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="4.99">Beginner Plan (For testing)</option>
            <option value="19.99">Standard Plan (5 Days)</option>
            <option value="29.99">Premium Plan (10 Days)</option>
          </select>


          {/* payment options or components */}
          <Elements stripe={stripePromise}>
            {/* form component needed */}
            <CheckoutForm price={price} ></CheckoutForm>
          </Elements>

          {/* Subscribe Button */}

        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
