import useAxiosPublic from "@/hooks/useAxiosPublic";
import ArticleCard from "@/shared/ArticleCard";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllArticles = () => {
    const axiosPublic = useAxiosPublic()
    const [tags, setTags] = useState("")
    const [publisher, setPublisher] = useState("")
    const [search, setSearch] = useState("")

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["articles", publisher, search, tags],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/all-articles-user?tags=${tags}&search=${search}&publisher=${publisher}`)
            return data
        }
    })

    const tagOptions = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Health', label: 'Health' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Business', label: 'Business' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Innovation', label: 'Innovation' },
        { value: 'Environment', label: 'Environment' },
    ];

    const { data: publishers = [] } = useQuery({
        queryKey: ["publishersForFilter"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-publishers")
            return data
        }
    })



    const handleSearch = (e) => {
        e.preventDefault()
        const searchText = e.target.search.value
        setSearch(searchText)
        console.log(search)
    }


    const approvedArticles = articles.filter(article => article.status === "approved")
    console.log(approvedArticles)

    return (
        <div>
            <Helmet>
                <title>All Articles || News Chronicle</title>
            </Helmet>
            <div className="w-11/12 mx-auto pt-10">
                <div className="flex items-center flex-col lg:flex-row justify-between px-2">
                    <div>
                        <h2 className="text-3xl font-medium mb-6 lg:mb-0">All News</h2>
                    </div>
                    {/* search filter section */}
                    <nav className="flex items-center flex-col md:flex-row justify-center gap-6">
                        {/* filter section */}
                        <div className="w-full">
                            <select
                                id="publisher"
                                name="publisher"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select a Publisher</option>
                                {publishers.map((publisher) => (
                                    <option key={publisher._id} value={publisher.publisherName}>
                                        {publisher.publisherName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* search section */}
                        <div className="flex justify-center ">
                            <form onSubmit={handleSearch} className="flex items-center w-full max-w-md bg-white shadow-md rounded-lg">
                                <input
                                    type="text"
                                    name="search"

                                    placeholder="Search news..."
                                    className="flex-grow px-4 py-2 text-gray-700 bg-transparent rounded-l-lg"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-slate-600 text-white font-medium rounded-r-lg hover:bg-slate-700  transition duration-300"
                                >
                                    Search
                                </button>
                            </form>

                        </div>

                        {/* filter by tags */}
                        <div className="w-full">
                            <select
                                id="tags"
                                name="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option disabled value=''>Select a tag</option>
                                {tagOptions.map((tag, idx) =>
                                    <option key={idx} value={tag.value}>{tag.label}</option>)}
                            </select>
                        </div>
                    </nav>
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
                                <ArticleCard key={article._id} article={article} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllArticles;