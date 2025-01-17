import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllArticles = () => {
    const axiosPublic = useAxiosPublic()

    const { data = [], isLoading } = useQuery({
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
                <div className="w-11/12 mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl">All News {approvedArticles.length}</h2>
                        </div>
                        {/* search filter section */}
                        <nav className="flex items-center justify-center gap-6">
                            {/* filter section */}
                            <div>
                                filter section
                            </div>
                            {/* search section */}
                            <div>
                                <input type="text" /> <i>search</i>
                            </div>
                        </nav>
                    </div>
                     
                     <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {approvedArticles.map(article=> 
                            <div key={article._id} className="card bg-base-100  shadow-xl">
                            <figure>
                              <img
                                src={article.image}
                                alt="Shoes" />
                            </figure>
                            <div className="card-body">
                              <h2 className="card-title">Shoes! {article.isPremium && <span className="badge bg-orange-500 inline-block">Premium</span>} </h2>
                              <p>If a dog chews shoes whose shoes does he choose?</p>
                              <div className="card-actions justify-end">
                                <Link to={`/article/${article._id}`} className="btn btn-primary">View details</Link>
                              </div>
                            </div>
                          </div>
                        )}
                     </div>
                </div>
            }
        </div>
    );
};

export default AllArticles;