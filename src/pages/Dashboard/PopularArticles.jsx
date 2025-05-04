"use client"

import { useState, useEffect } from "react"
import { Calendar, Eye, Award, ChevronRight, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "@/hooks/useAxiosPublic"



// Get all unique tags from the data
const getAllTags = (articles) => {
    const tagSet = new Set()
    articles.forEach((article) => {
        article.tags.forEach((tag) => {
            tagSet.add(tag.value)
        })
    })
    return Array.from(tagSet)
}

// Tag colors mapping
const tagColors = {
    Technology: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    Sports: "bg-green-100 text-green-800 hover:bg-green-200",
    Health: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    Innovation: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    Fashion: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    Environment: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    Space: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    Travel: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
    Food: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    Culture: "bg-rose-100 text-rose-800 hover:bg-rose-200",
}

export default function NewsCardContainer() {
    const axiosPublic = useAxiosPublic()
    const [selectedTags, setSelectedTags] = useState([])
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const { data = [], isLoading } = useQuery({
        queryKey: ["article"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/all-articles-user`);
            // setArticles(data)
            return data;
        },
    });

    const newArticles = data
        ? data.filter((article) => article.status === "approved")
            .sort((a, b) => b.views - a.views)
            .slice(0, 6)
        : []


    useEffect(() => {
        setArticles(newArticles)
    }, [data])

    // console.log(newArticles)
    const [articles, setArticles] = useState(newArticles)


    console.log(newArticles)
    const allTags = getAllTags(newArticles)
    // Filter articles based on selected tags
    useEffect(() => {
        if (selectedTags.length === 0) {
            setArticles(newArticles)
            return
        }

        const filtered = newArticles.filter((article) =>
            article.tags.some((tag) => selectedTags.includes(tag.value)))
        setArticles(filtered)
    }, [selectedTags])

    // Toggle tag selection
    const toggleTag = (tag) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    }

    // Format date
    const formatDate = (timestamp) => {
        return format(new Date(timestamp), "MMM dd, yyyy")
    }

    // Truncate text
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + "..."
    }

    return (
        <div className="w-full max-w-6xl px-4 py-8">
            <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-slate-800">Latest News</h2>

                    <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                Filter by Tags
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {allTags.map((tag) => (
                                <DropdownMenuCheckboxItem
                                    key={tag}
                                    checked={selectedTags.includes(tag)}
                                    onCheckedChange={() => toggleTag(tag)}
                                >
                                    {tag}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                            <Badge key={tag} variant="outline" className="px-3 py-1 cursor-pointer" onClick={() => toggleTag(tag)}>
                                {tag} ×
                            </Badge>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTags([])}
                            className="text-sm text-slate-500 hover:text-slate-700"
                        >
                            Clear all
                        </Button>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
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

                                    <p className="text-slate-600 mb-4 flex-grow">{truncateText(article.description, 120)}</p>

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

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 -mr-2"
                                        >
                                            Read more
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
