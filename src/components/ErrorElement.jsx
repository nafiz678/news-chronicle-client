import Lottie from "lottie-react";
import errorAnim from "@/assets/errorPage.json"
const ErrorPage = () => {



    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-6 max-w-3xl">
          
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Oops! The page you’re looking for doesn’t exist.
          </p>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            It might have been moved or deleted.
          </p>
          <Lottie animationData={errorAnim} loop={true}></Lottie>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-6 px-6 py-3 bg-slate-800 text-white text-lg font-medium rounded-lg shadow hover:bg-slate-900 focus:ring-4  transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;