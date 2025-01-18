
import CountUp from "react-countup";
import { FaCrown, FaUser, FaUsers } from "react-icons/fa";

const Statistic = ({ stats }) => {
  const { totalUsers, normalUsers, premiumUsers } = stats;

  return (
    <div className="my-10 flex flex-col justify-center items-center bg-background p-4">
      <h1 className="text-4xl tracking-[0.6rem] font-bold text-gray-800 uppercase mb-10 text-center">
        User Statistics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Total Users Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <FaUsers></FaUsers>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <CountUp
            end={totalUsers}
            duration={2.5}
            className="text-4xl font-bold text-blue-600"
          />
        </div>

        {/* Normal Users Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <FaUser></FaUser>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Normal Users</h2>
          <CountUp
            end={normalUsers}
            duration={2.5}
            className="text-4xl font-bold text-green-600"
          />
        </div>

        {/* Premium Users Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="bg-yellow-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <FaCrown></FaCrown>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Premium Users</h2>
          <CountUp
            end={premiumUsers}
            duration={2.5}
            className="text-4xl font-bold text-yellow-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
