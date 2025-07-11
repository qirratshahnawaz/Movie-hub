"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockMovies } from "@/lib/mock-data"

export default function TrendingPage() {
  const [timeframe, setTimeframe] = useState("today")

  // Simulate trending logic by sorting by rating and recent release
  const trendingMovies = mockMovies
    .sort((a, b) => {
      const scoreA = a.rating + (Number.parseInt(a.releaseDate) > 2020 ? 2 : 0)
      const scoreB = b.rating + (Number.parseInt(b.releaseDate) > 2020 ? 2 : 0)
      return scoreB - scoreA
    })
    .slice(0, timeframe === "today" ? 12 : timeframe === "week" ? 18 : 24)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold">Trending Now</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Discover what everyone is watching right now</p>
        </div>

        {/* Time Filter */}
        <div className="mb-8">
          <div className="flex gap-2">
            <Button variant={timeframe === "today" ? "default" : "outline"} onClick={() => setTimeframe("today")}>
              Today
            </Button>
            <Button variant={timeframe === "week" ? "default" : "outline"} onClick={() => setTimeframe("week")}>
              This Week
            </Button>
            <Button variant={timeframe === "month" ? "default" : "outline"} onClick={() => setTimeframe("month")}>
              This Month
            </Button>
          </div>
        </div>

        {/* Trending Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Most Watched</h3>
            <p className="text-2xl font-bold">{trendingMovies[0]?.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                #{1}
              </Badge>
              <span className="text-sm">Trending</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Highest Rated</h3>
            <p className="text-2xl font-bold">{trendingMovies.sort((a, b) => b.rating - a.rating)[0]?.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                ⭐ {trendingMovies.sort((a, b) => b.rating - a.rating)[0]?.rating}
              </Badge>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Latest Release</h3>
            <p className="text-2xl font-bold">
              {trendingMovies.sort((a, b) => Number.parseInt(b.releaseDate) - Number.parseInt(a.releaseDate))[0]?.title}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {
                  trendingMovies.sort((a, b) => Number.parseInt(b.releaseDate) - Number.parseInt(a.releaseDate))[0]
                    ?.releaseDate
                }
              </span>
            </div>
          </div>
        </div>

        {/* Trending Movies */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Trending {timeframe === "today" ? "Today" : timeframe === "week" ? "This Week" : "This Month"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{trendingMovies.length} trending movies</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {trendingMovies.map((movie, index) => (
            <div key={movie.id} className="relative">
              <Badge className="absolute -top-2 -left-2 z-10 bg-red-600 text-white">#{index + 1}</Badge>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
