"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockMovies } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface GenrePageProps {
  params: {
    slug: string
  }
}

export default function GenrePage({ params }: GenrePageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [yearFilter, setYearFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const genreName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1)

  const filteredMovies = mockMovies
    .filter((movie) => {
      const matchesGenre = movie.genres.some((genre) => genre.toLowerCase() === params.slug.toLowerCase())
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesYear = !yearFilter || movie.releaseDate.includes(yearFilter)
      const matchesRating = !ratingFilter || movie.rating >= Number.parseFloat(ratingFilter)

      return matchesGenre && matchesSearch && matchesYear && matchesRating
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

  const years = Array.from(new Set(mockMovies.map((movie) => movie.releaseDate)))
    .sort()
    .reverse()
  const genreMovieCount = mockMovies.filter((movie) =>
    movie.genres.some((genre) => genre.toLowerCase() === params.slug.toLowerCase()),
  ).length

  const clearFilters = () => {
    setSearchQuery("")
    setYearFilter("")
    setRatingFilter("")
    setSortBy("popular")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{genreName[0]}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold">{genreName} Movies</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {genreMovieCount} movies • Showing {filteredMovies.length} results
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={`Search ${genreName.toLowerCase()} movies...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="year">Newest First</option>
                      <option value="title">A-Z</option>
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Release Year</label>
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">All Years</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                    <select
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">Any Rating</option>
                      <option value="8">8.0+ Excellent</option>
                      <option value="7">7.0+ Very Good</option>
                      <option value="6">6.0+ Good</option>
                      <option value="5">5.0+ Average</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Filters */}
          {(searchQuery || yearFilter || ratingFilter || sortBy !== "popular") && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
              {yearFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Year: {yearFilter}
                  <button onClick={() => setYearFilter("")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
              {ratingFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Rating: {ratingFilter}+
                  <button onClick={() => setRatingFilter("")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
              {sortBy !== "popular" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Sort: {sortBy}
                  <button onClick={() => setSortBy("popular")} className="ml-1 hover:text-red-600">
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search terms or filters</p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
