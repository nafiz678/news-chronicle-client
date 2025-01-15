import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";

const AllArticles = () => {
    const axiosPublic = useAxiosPublic()

    const { data=[], isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-articles")
            return data
        }
    })
    const approvedArticles = data.filter(article => article.status === "approved")
    console.log(approvedArticles)
    return (
        <div>
            {isLoading ?
                <div className="flex items-center justify-center gap-3 h-screen">
                    <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
                :
                <div>
                    {/* search filter section */}
                    <nav>
                        {/* search section */}
                        <div>
                            <input type="text" />
                        </div>
                        
                        <div></div>
                    </nav>
                </div>
            }
        </div>
    );
};

export default AllArticles;