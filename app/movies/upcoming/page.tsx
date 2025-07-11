"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Filter } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockMovies } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function UpcomingMoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const genres = Array.from(new Set(mockMovies.flatMap((movie) => movie.genres)))

  // Filter for upcoming movies (2023 and later for demo)
  const upcomingMovies = mockMovies
    .filter((movie) => {
      const isUpcoming = Number.parseInt(movie.releaseDate) >= 2023
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = !selectedGenre || movie.genres.includes(selectedGenre)
      return isUpcoming && matchesSearch && matchesGenre
    })
    .sort((a, b) => Number.parseInt(b.releaseDate) - Number.parseInt(a.releaseDate))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">Coming Soon</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Get ready for the most anticipated movies</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search upcoming movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by genre:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedGenre === null ? "default" : "outline"}
                onClick={() => setSelectedGenre(null)}
                size="sm"
              >
                All Genres
              </Button>
              {genres.slice(0, 6).map((genre) => (
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
          <p className="text-gray-600 dark:text-gray-400">{upcomingMovies.length} upcoming movies</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="relative">
              <Badge className="absolute -top-2 -left-2 z-10 bg-blue-600 text-white">{movie.releaseDate}</Badge>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
