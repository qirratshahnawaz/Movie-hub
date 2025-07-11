"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockMovies } from "@/lib/mock-data"

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("popular")

  const genres = Array.from(new Set(mockMovies.flatMap((movie) => movie.genres)))

  const filteredMovies = mockMovies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGenre = !selectedGenre || movie.genres.includes(selectedGenre)
      return matchesSearch && matchesGenre
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "year":
          return Number.parseInt(b.releaseDate) - Number.parseInt(a.releaseDate)
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Movies</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover thousands of movies from every genre and era</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Genre and Sort Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by:</span>
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
              {genres.map((genre) => (
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

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="year">Newest First</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredMovies.length} movies
            {searchQuery && ` for "${searchQuery}"`}
            {selectedGenre && ` in ${selectedGenre}`}
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search terms or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedGenre(null)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
