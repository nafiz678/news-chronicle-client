import { useState } from "react";

const SubscriptionPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1"); // Default 1 minute
  const [price, setPrice] = useState(5); // Default price for 1 minute

  // Handle subscription period change
  const handlePeriodChange = (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);

    // Set price based on the selected period
    if (period === "1") {
      setPrice(5); // Price for 1 minute
    } else if (period === "5") {
      setPrice(20); // Price for 5 days
    } else if (period === "10") {
      setPrice(35); // Price for 10 days (more expensive for long-term)
    }
  };

  // Navigate to the payment page when user clicks the "Subscribe" button
  const handleSubscription = () => {
    console.log("Payment page/modal");
  };

  return (
    <div className="pb-20 bg-gradient-to-b from-gray-800 via-gray-800 to-gray-900 text-white">
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

      {/* <section>
        <PlansSection></PlansSection>
      </section> */}

      {/* Subscription Plan Section */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Your Plan</h2>

          {/* Dropdown to select subscription period */}
          <select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="w-full px-4 py-2 mb-4 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <option value="1">1 Minute (For testing)</option>
            <option value="5">5 Days</option>
            <option value="10">10 Days</option>
          </select>

          {/* Price Display */}
          <div className="text-xl font-bold text-gray-800 mb-6">
            <span className="text-gray-700">Total Price: </span>${price}
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscription}
            className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
          >
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
