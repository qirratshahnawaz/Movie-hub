"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Filter } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockMovies } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function TrendingMoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("today")

  const genres = Array.from(new Set(mockMovies.flatMap((movie) => movie.genres)))

  // Simulate trending logic
  const trendingMovies = mockMovies
    .sort((a, b) => {
      const scoreA = a.rating + (Number.parseInt(a.releaseDate) > 2020 ? 2 : 0)
      const scoreB = b.rating + (Number.parseInt(b.releaseDate) > 2020 ? 2 : 0)
      return scoreB - scoreA
    })
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = !selectedGenre || movie.genres.includes(selectedGenre)
      return matchesSearch && matchesGenre
    })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold">Trending Movies</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Discover what everyone is watching right now</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search trending movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Time and Genre Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>

            {/* Time Filter */}
            <div className="flex gap-2">
              <Button
                variant={timeframe === "today" ? "default" : "outline"}
                onClick={() => setTimeframe("today")}
                size="sm"
              >
                Today
              </Button>
              <Button
                variant={timeframe === "week" ? "default" : "outline"}
                onClick={() => setTimeframe("week")}
                size="sm"
              >
                This Week
              </Button>
              <Button
                variant={timeframe === "month" ? "default" : "outline"}
                onClick={() => setTimeframe("month")}
                size="sm"
              >
                This Month
              </Button>
            </div>

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedGenre === null ? "default" : "outline"}
                onClick={() => setSelectedGenre(null)}
                size="sm"
              >
                All Genres
              </Button>
              {genres.slice(0, 5).map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  onClick={() => setSelectedGenre(genre)}
                  size="sm"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {trendingMovies.length} trending movies
            {searchQuery && ` for "${searchQuery}"`}
            {selectedGenre && ` in ${selectedGenre}`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
