import { cn } from "@/lib/utils";
import Marquee from "./ui/marquee";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";



const ReviewCard = ({
    publisherImage,
    publisherName,
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-col items-center gap-2">
                <div className="bg-background rounded-full p-2 ">
                    <img className="rounded-full" width="80" height="80" alt="" src={publisherImage} />
                </div>
                <div className="flex flex-col">
                    <figcaption className="text-sm text-center font-medium dark:text-white">
                        Publication Name: {publisherName}
                    </figcaption>
                </div>
            </div>
        </figure>
    );
};

export default function AllPublishers() {

    const axiosPublic = useAxiosPublic()

    const { data: publishers = [] } = useQuery({
        queryKey: ["publisher"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-publishers")
            return data
        }
    })


    return (
        <>
        <h1 className=" tracking-[0.6rem] font-bold text-gray-800 uppercase text-center">
                <div className="z-10 flex items-center justify-center">
                    <div
                        className={cn(
                            "group rounded-full  mt-10 lg:text-4xl md:text-3xl text-xl text-white transition-all ease-in hover:cursor-pointer   text-nowrap ",
                        )}
                    >
                        <AnimatedShinyText className="inline-flex text-neutral-600 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-700 hover:duration-300">
                            <span>ALL PUBLISHERS</span> 
                        </AnimatedShinyText>
                    </div>
                </div>
            </h1>
        <div className="relative w-10/12 mx-auto  flex h-[300px] flex-col items-center justify-center overflow-hidden bg-background ">
            
            <Marquee pauseOnHover className="[--duration:30s]">
                {publishers.map((publisher) => (
                    <ReviewCard key={publisher._id} {...publisher} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#E3E3E3] dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#E3E3E3] dark:from-background"></div>
        </div>
        </>
    );
}
