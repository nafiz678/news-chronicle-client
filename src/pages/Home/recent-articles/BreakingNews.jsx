import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

// Breaking news data
const breakingNews = [
  {
    id: 1,
    label: "Breaking News",
    icon: "🛑",
    headline: "Israel launches new airstrike on Gaza Strip",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    category: "World",
    urgent: true,
  },
  {
    id: 2,
    label: "Market Crash",
    icon: "📉",
    headline: "Dow plunges 700 pts in early trading",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    category: "Business",
    urgent: true,
  },
  {
    id: 3,
    label: "Tech Leak",
    icon: "📱",
    headline: "Apple AI assistant demo leaked ahead of WWDC",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    category: "Technology",
    urgent: false,
  },
  {
    id: 4,
    label: "Sports Update",
    icon: "🏆",
    headline: "Manchester United secures dramatic last-minute victory",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    category: "Sports",
    urgent: false,
  },
  {
    id: 5,
    label: "Health Alert",
    icon: "⚠️",
    headline: "CDC issues warning about new respiratory virus strain",
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    category: "Health",
    urgent: true,
  },
]

// Format relative time
const formatRelativeTime = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes === 1) return "1 min ago"
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours === 1) return "1 hour ago"
  if (diffInHours < 24) return `${diffInHours} hours ago`

  return "Over a day ago"
}

// Get category color
const getCategoryColor = (category) => {
  const colors = {
    World: "bg-blue-500",
    Business: "bg-green-500",
    Technology: "bg-indigo-500",
    Sports: "bg-yellow-500",
    Health: "bg-red-500",
    Entertainment: "bg-purple-500",
    Politics: "bg-red-600",
    Opinion: "bg-gray-500",
  }

  return colors[category] || "bg-gray-500"
}

export default function BreakingNews() {
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showTooltip, setShowTooltip] = useState(null)
  const tickerRef = useRef(null)
  const navigate = useNavigate()

  // Auto-scroll ticker
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % breakingNews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  // Handle manual navigation
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % breakingNews.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length)
  }

  return (
    <div className="bottom-0 w-6/12 z-50 hidden md:block fixed right-0 dark:bg-gray-900 bg-gray-200 rounded-lg overflow-hidden shadow-lg">

      {/* Ticker */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={tickerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {breakingNews.map((news, index) => (
            <div
              key={news.id}
              className="min-w-full p-4 cursor-pointer"
              onMouseEnter={() => setShowTooltip(news.id)}
              onMouseLeave={() => setShowTooltip(null)}
              onClick={() => navigate("/all-articles")}
            >
              <div className="flex items-center space-x-3">
                {/* Label */}
                <div
                  className={cn(
                    "flex items-center space-x-1 px-2 py-1 rounded-full",
                    news.urgent ? "bg-red-600" : "bg-orange-500",
                  )}
                >
                  <span className="text-white text-xs font-bold">{news.label}</span>
                  {news.urgent && <span className="h-2 w-2 bg-white rounded-full animate-ping opacity-75"></span>}
                </div>

                {/* Icon */}
                <span className="text-xl">{news.icon}</span>

                {/* Headline */}
                <h3 className="font-bold dark:text-white text-lg truncate flex-1">{news.headline}</h3>

                {/* Time and Category */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs dark:text-gray-300 text-gray-800">{formatRelativeTime(news.timestamp)}</span>
                  <span className={cn("text-xs text-white px-2 py-0.5 rounded-full", getCategoryColor(news.category))}>
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Tooltip */}
              {showTooltip === news.id && (
                <div className="absolute left-0 right-0 bottom-0 bg-black bg-opacity-80 p-3 text-white text-sm">
                  <p>{news.headline}</p>
                  <p className="text-xs text-gray-300 mt-1">Click to read the full story</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 py-1 dark:bg-gray-800 ">
        {breakingNews.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              index === activeIndex ? "bg-white" : "bg-gray-600 hover:bg-gray-500",
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to news item ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile Swipe Indicator */}
      <div className="md:hidden flex justify-center items-center text-gray-500 text-xs py-1">
        <span>Swipe for more</span>
      </div>
    </div>
  )
}
