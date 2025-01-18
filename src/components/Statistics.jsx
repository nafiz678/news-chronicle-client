
import CountUp from "react-countup";
import { FaCrown, FaUser, FaUsers } from "react-icons/fa";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { cn } from "@/lib/utils";

const Statistic = ({ stats }) => {
  const { totalUsers, normalUsers, premiumUsers } = stats;

  return (
    <div className="mb-10 flex flex-col justify-center items-center bg-background p-4">
      <h1 className=" tracking-[0.5rem] py-10 font-bold text-gray-800 uppercase text-center">
                <div className="z-10 flex items-center justify-center">
                    <div
                        className={cn(
                            "group rounded-full border  border-black/5 lg:text-4xl md:text-3xl text-xl text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200  text-nowrap ",
                        )}
                    >
                        <AnimatedShinyText className="inline-flex text-neutral-600 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-700 hover:duration-300">
                            <span>user statistics</span> 
                        </AnimatedShinyText>
                    </div>
                </div>
            </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
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
