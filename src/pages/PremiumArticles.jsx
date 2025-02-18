import PremiumArticleCard from "@/components/PremiumArticleCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const PremiumArticles = () => {

    const axiosPublic = useAxiosPublic()

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/all-articles-user`)
            return data
        }
    })


    const approvedArticles = articles.filter(article => article.status === "approved").filter(item=> item.isPremium)
    


    return (
        <div>
            <Helmet>
                <title>Premium Articles || News Chronicle</title>
            </Helmet>
            <div className="w-11/12 mx-auto pt-10">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h2 className="text-3xl font-medium">All Premium News</h2>
                    </div>
                </div>

                <div className="mt-10">
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-3 h-screen">
                            <Loader />
                            <h1 className="text-4xl">Loading...</h1>
                        </div>
                    ) : approvedArticles.length === 0 ? (
                        <div className="text-center text-gray-800 p-20">
                            <h2 className="text-5xl">No Articles Found.</h2>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 mb-20">
                            {approvedArticles.map((article) => (
                                <PremiumArticleCard key={article._id} article={article} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PremiumArticles;