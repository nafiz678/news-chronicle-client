import { useState } from "react";
import { Link } from "react-router-dom";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-transparent dark:bg-transparent border-2 border-gray-400 rounded-lg p-8 lg:p-12 dark:text-gray-200">
        {!isSubmitted ? (
          <div>
            {/* Header */}
            <h1 className="text-3xl lg:text-5xl font-bold dark:text-white text-black text-center mb-4">
              Stay Updated with the Latest News
            </h1>
            <p className="dark:text-gray-300 text-gray-500 text-center lg:text-lg mb-8">
              Join our newsletter to get the latest stories, insights, and
              updates directly in your inbox.
            </p>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="text-blue-500 text-3xl">
                  <i className="fas fa-bell"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-black">
                    Instant Alerts
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Get notified as soon as breaking news is published.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-blue-500 text-3xl">
                  <i className="fas fa-globe-americas"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-black">
                    Global Updates
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Stay informed about events shaping the world.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-blue-500 text-3xl">
                  <i className="fas fa-star"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white text-black">
                    Exclusive Content
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Access special reports and curated insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block ml-1 mb-1 text-sm font-medium dark:text-white text-black"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-black border border-gray-600 rounded-lg shadow-sm dark:text-gray-100 focus:outline-none focus:ring-2 bg-background placeholder:text-slate-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-lg shadow-md hover:bg-blue-700 transition-all"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Thank You for Subscribing!
            </h2>
            <p className="text-gray-300 lg:text-lg mb-4">
              You're now part of our newsletter. Stay tuned for the latest
              updates.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-all"
            >
              <Link to={`/subscription`}>Go Premium</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
