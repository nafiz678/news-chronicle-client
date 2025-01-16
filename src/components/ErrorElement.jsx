
const ErrorPage = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-6 max-w-3xl">
          <h1 className="text-8xl font-extrabold text-gray-800 dark:text-gray-100">
            404
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Oops! The page you’re looking for doesn’t exist.
          </p>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            It might have been moved or deleted.
          </p>
          <img
            className="mt-6 mx-auto max-w-full h-64 object-contain"
            src="https://via.placeholder.com/300x200?text=Illustration" // Replace with your illustration URL
            alt="Page not found"
          />
          <button
            onClick={() => window.location.href = "/"}
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;