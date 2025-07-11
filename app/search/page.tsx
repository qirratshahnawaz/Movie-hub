"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockMovies } from "@/lib/mock-data"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMovies, setFilteredMovies] = useState(mockMovies)
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const genres = Array.from(new Set(mockMovies.flatMap((movie) => movie.genres)))

  useEffect(() => {
    let filtered = mockMovies

    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genres.some((genre) => genre.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedGenre) {
      filtered = filtered.filter((movie) => movie.genres.includes(selectedGenre))
    }

    setFilteredMovies(filtered)
  }, [searchQuery, selectedGenre])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Search Movies</h1>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
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
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredMovies.length} results found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedGenre && ` in ${selectedGenre}`}
          </p>
        </div>

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
