"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockTVShows } from "@/lib/mock-data"

export default function TVShowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const genres = Array.from(new Set(mockTVShows.flatMap((show) => show.genres)))

  const filteredShows = mockTVShows.filter((show) => {
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = !selectedGenre || show.genres.includes(selectedGenre)
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">TV Shows</h1>
          <p className="text-gray-600 dark:text-gray-400">Binge-watch the best TV series and shows</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

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
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">Showing {filteredShows.length} TV shows</p>
        </div>

        {/* TV Shows Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredShows.map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
