import useAxiosPublic from "@/hooks/useAxiosPublic";
import ArticleCard from "@/shared/ArticleCard";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion"
import { Calendar, Eye, Award, ChevronRight, Filter } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useRole from "@/hooks/useRole";

const AllArticles = () => {
    const [role] = useRole()
    console.log(role)
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
        { value: 'World News', label: 'World News' },
        { value: 'Politics', label: 'Politics' },
    ];

    const tagColors = {
        Technology: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        Health: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        Sports: "bg-green-100 text-green-800 hover:bg-green-200",
        Business: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        Entertainment: "bg-red-100 text-red-800 hover:bg-red-200",
        Innovation: "bg-amber-100 text-amber-800 hover:bg-amber-200",
        Environment: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
        "World News": "bg-teal-100 text-teal-800 hover:bg-teal-200",
        Politics: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    };

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

    }
    const approvedArticles = articles.filter(article => article.status === "approved")

    const formatDate = (timestamp) => {
        return format(new Date(timestamp), "MMM dd, yyyy")
    }
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + "..."
    }
    return (
        <div>
            <Helmet>
                <title>All Articles || News Chronicle</title>
            </Helmet>
            <div className="w-11/12 mx-auto py-10">
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
                                className="w-full p-2 border dark:text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" className="" disabled>Select a Publisher</option>
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
                                className="w-full p-2 border dark:text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {approvedArticles.map((article, index) => (
                                <motion.div
                                    key={article._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group"
                                >
                                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                        <div className="relative overflow-hidden">
                                            <div className="aspect-video w-full overflow-hidden">
                                                <img
                                                    src={article.image || "/placeholder.svg"}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            {article.isPremium && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-lg">
                                                        <Award className="h-3 w-3" />
                                                        Premium
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm">
                                                <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    <motion.span
                                                        initial={{ count: 0 }}
                                                        animate={{ count: article.views }}
                                                        transition={{ duration: 1, delay: index * 0.2 }}
                                                    >
                                                        {article.views}
                                                    </motion.span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-sm text-slate-500">{article.publisher}</span>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-sm text-slate-500 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(article.postedDate)}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
                                                {article.title}
                                            </h3>

                                            <p className="text-slate-600 mb-4 flex-grow">{truncateText(article.description, 70)}</p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {article.tags.map((tag) => (
                                                    <span
                                                        key={tag.value}
                                                        className={`text-xs px-2.5 py-1 rounded-full cursor-pointer transition-colors ${tagColors[tag.value] || "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
                                                        onClick={() => toggleTag(tag.value)}
                                                    >
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={article.authorPhoto || "/placeholder.svg"}
                                                        alt={article.authorName}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <span className="text-sm font-medium text-slate-700">{article.authorName}</span>
                                                </div>

                                                <Link to={`${role === "user" ? article.isPremium ? "/subscription" : `/article/${article._id}` : `/article/${article._id}`}`}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 -mr-2"
                                                    >
                                                        Read more
                                                        <ChevronRight className="h-4 w-4 ml-1" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllArticles;