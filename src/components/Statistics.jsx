import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FaCrown, FaUser, FaUsers } from "react-icons/fa";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const Statistic = () => {
  const axiosPublic = useAxiosPublic()

  const {data=[]} = useQuery({
    queryKey: ["stats"],
    queryFn: async ()=>{
      const {data} = await axiosPublic.get("/all-users-stat")
      return data
    }
  })
  
      const normal = data.filter(item=> item.role === "user")
      const premium = data.filter(item=> item.role === "premium" || item.role === "admin")

  const stats = {
    totalUsers: data.length, normalUsers: normal.length, premiumUsers: premium.length
  }
  const { totalUsers, normalUsers, premiumUsers } = stats;

  
  const { ref: totalUsersRef, inView: totalUsersInView } = useInView({ triggerOnce: true, threshold: 1 });
  const { ref: normalUsersRef, inView: normalUsersInView } = useInView({ triggerOnce: true, threshold: 1 });
  const { ref: premiumUsersRef, inView: premiumUsersInView } = useInView({ triggerOnce: true, threshold: 1 });

  return (
    <div className="mb-10 flex flex-col justify-center items-center bg-background p-4">
      <h1 className="tracking-[0.5rem] py-10 font-bold text-gray-800 uppercase text-center">
        <div className="z-10 flex items-center justify-center">
          <div className={cn("group rounded-full lg:text-4xl md:text-3xl text-xl text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 text-nowrap")}>
            <AnimatedShinyText className="inline-flex text-neutral-600 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-700 hover:duration-300">
              <span>user statistics</span>
            </AnimatedShinyText>
          </div>
        </div>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Total Users Card */}
        <div ref={totalUsersRef} className="bg-white dark:bg-transparent dark:shadow-none dark:border-2 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <FaUsers />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Total Users</h2>
          {totalUsersInView && (
            <CountUp end={totalUsers} duration={2.5} className="text-4xl font-bold text-blue-600" />
          )}
        </div>

        {/* Normal Users Card */}
        <div ref={normalUsersRef} className="bg-white dark:bg-transparent dark:shadow-none dark:border-2 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <FaUser />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Normal Users</h2>
          {normalUsersInView && (
            <CountUp end={normalUsers} duration={2.5} className="text-4xl font-bold text-green-600" />
          )}
        </div>

        {/* Premium Users Card */}
        <div ref={premiumUsersRef} className="bg-white dark:bg-transparent dark:shadow-none dark:border-2 shadow-lg rounded-lg p-6 flex flex-col items-center">
          <div className="bg-yellow-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <FaCrown />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Premium Users</h2>
          {premiumUsersInView && (
            <CountUp end={premiumUsers} duration={2.5} className="text-4xl font-bold text-yellow-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
