
import { useState } from "react"
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Category data
const categories = [
  {
    id: "world",
    name: "World News",
    color: "blue",
    icon: "🌍",
    featured: {
      id: 1,
      title: "UN Calls Emergency Meeting on Sudan Conflict",
      summary:
        "The United Nations Security Council has called an emergency meeting to address the escalating humanitarian crisis in Sudan as conflict intensifies.",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      author: "Sarah Johnson",
    },
    articles: [
      {
        id: 2,
        title: "Elections in India: What to Expect",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: 3,
        title: "China's Economy Slows Again in Q1",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: 4,
        title: "Brazil Floods Displace 10,000",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
      },
    ],
  },
  {
    id: "politics",
    name: "Politics",
    color: "red",
    icon: "🏛️",
    featured: {
      id: 5,
      title: "Senate Passes Landmark Climate Bill After Marathon Session",
      summary:
        "After 18 hours of debate, the Senate approved a historic climate bill that allocates $500 billion toward renewable energy infrastructure.",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      author: "Michael Roberts",
    },
    articles: [
      {
        id: 6,
        title: "Supreme Court to Hear Major Voting Rights Case",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
      },
      {
        id: 7,
        title: "Presidential Approval Rating Hits New Low",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 40 * 60 * 1000),
      },
      {
        id: 8,
        title: "European Leaders Meet to Discuss Energy Crisis",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    color: "indigo",
    icon: "📱",
    featured: {
      id: 9,
      title: "AI Breakthrough Could Transform Medical Diagnostics",
      summary:
        "Researchers have developed a new AI system capable of detecting early signs of cancer with 95% accuracy, potentially revolutionizing medical diagnostics.",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      author: "Jessica Chen",
    },
    articles: [
      {
        id: 10,
        title: "New Smartphone Folds in Three Places",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 35 * 60 * 1000),
      },
      {
        id: 11,
        title: "Quantum Computing Milestone Achieved",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 50 * 60 * 1000),
      },
      {
        id: 12,
        title: "Major Tech Companies Face New Antitrust Probe",
        image: "/placeholder.svg?height=100&width=150",
        timestamp: new Date(Date.now() - 70 * 60 * 1000),
      },
    ],
  },
]

// Format relative time
const formatRelativeTime = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes === 1) return "1m ago"
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours === 1) return "1h ago"
  if (diffInHours < 24) return `${diffInHours}h ago`

  return "Over a day ago"
}

// Get category color classes
const getCategoryColorClasses = (color) => {
  const colorMap = {
    blue: {
      badge: "bg-blue-500",
      border: "border-blue-500",
      hover: "hover:bg-blue-50 hover:border-blue-500",
    },
    red: {
      badge: "bg-red-500",
      border: "border-red-500",
      hover: "hover:bg-red-50 hover:border-red-500",
    },
    green: {
      badge: "bg-green-500",
      border: "border-green-500",
      hover: "hover:bg-green-50 hover:border-green-500",
    },
    indigo: {
      badge: "bg-indigo-500",
      border: "border-indigo-500",
      hover: "hover:bg-indigo-50 hover:border-indigo-500",
    },
    yellow: {
      badge: "bg-yellow-500",
      border: "border-yellow-500",
      hover: "hover:bg-yellow-50 hover:border-yellow-500",
    },
    purple: {
      badge: "bg-purple-500",
      border: "border-purple-500",
      hover: "hover:bg-purple-50 hover:border-purple-500",
    },
  }

  return (
    colorMap[color] || {
      badge: "bg-gray-500",
      border: "border-gray-500",
      hover: "hover:bg-gray-50 hover:border-gray-500",
    }
  )
}

export default function CategoryHighlights() {
  const [expandedCategories, setExpandedCategories] = useState({})
  const [activeCategory, setActiveCategory] = useState(null)

  // Toggle category expansion (for mobile)
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  return (
    <div className="space-y-12 w-11/12 mx-auto mb-20">
      {categories.map((category) => {
        const colorClasses = getCategoryColorClasses(category.color)
        const isExpanded = expandedCategories[category.id] !== false // Default to expanded

        return (
          <div key={category.id} className="relative">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <div className={cn("h-1 w-16", colorClasses.badge)}></div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center text-sm font-medium"
                  onClick={() => alert(`View all ${category.name} articles`)}
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>

                {/* Mobile toggle */}
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => toggleCategory(category.id)}>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Category Content */}
            {isExpanded && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Featured Article */}
                <Card
                  className={cn(
                    "col-span-3 md:col-span-1 overflow-hidden border-2 transition-all duration-300",
                    "hover:shadow-lg cursor-pointer",
                    colorClasses.hover,
                  )}
                  onClick={() => alert(`Reading: ${category.featured.title}`)}
                >
                  <div className="relative">
                    <img
                      src={category.featured.image || "/placeholder.svg"}
                      alt={category.featured.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div
                      className={cn(
                        "absolute top-2 left-2 px-2 py-1 rounded-full text-xs text-white",
                        colorClasses.badge,
                      )}
                    >
                      {category.name}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{category.featured.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{category.featured.summary}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{category.featured.author}</span>
                      <span>{formatRelativeTime(category.featured.timestamp)}</span>
                    </div>
                  </div>
                </Card>

                {/* Secondary Articles */}
                <div className="col-span-3 md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.articles.map((article) => (
                      <Card
                        key={article.id}
                        className={cn(
                          "overflow-hidden border transition-all duration-300",
                          "hover:shadow-md cursor-pointer",
                          colorClasses.hover,
                        )}
                        onClick={() => alert(`Reading: ${article.title}`)}
                      >
                        <div className="flex flex-col h-full">
                          <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-24 object-cover"
                          />
                          <div className="p-3 flex flex-col flex-1">
                            <h4 className="font-semibold line-clamp-2 flex-1">{article.title}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <span className={cn("text-xs text-white px-2 py-0.5 rounded-full", colorClasses.badge)}>
                                {category.name}
                              </span>
                              <span className="text-xs text-gray-500">{formatRelativeTime(article.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
