"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal, X } from "lucide-react"

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  availableGenres: string[]
  availableYears: string[]
}

export interface FilterState {
  searchQuery: string
  selectedGenres: string[]
  yearRange: { min: string; max: string }
  ratingRange: { min: number; max: number }
  sortBy: string
  language: string
  runtime: { min: number; max: number }
}

export function AdvancedFilters({ onFiltersChange, availableGenres, availableYears }: AdvancedFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedGenres: [],
    yearRange: { min: "", max: "" },
    ratingRange: { min: 0, max: 10 },
    sortBy: "popular",
    language: "",
    runtime: { min: 0, max: 300 },
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      searchQuery: "",
      selectedGenres: [],
      yearRange: { min: "", max: "" },
      ratingRange: { min: 0, max: 10 },
      sortBy: "popular",
      language: "",
      runtime: { min: 0, max: 300 },
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const toggleGenre = (genre: string) => {
    const newGenres = filters.selectedGenres.includes(genre)
      ? filters.selectedGenres.filter((g) => g !== genre)
      : [...filters.selectedGenres, genre]
    updateFilters({ selectedGenres: newGenres })
  }

  const hasActiveFilters =
    filters.searchQuery ||
    filters.selectedGenres.length > 0 ||
    filters.yearRange.min ||
    filters.yearRange.max ||
    filters.ratingRange.min > 0 ||
    filters.ratingRange.max < 10 ||
    filters.language ||
    filters.runtime.min > 0 ||
    filters.runtime.max < 300

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search movies..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {filters.selectedGenres.length +
                (filters.searchQuery ? 1 : 0) +
                (filters.yearRange.min || filters.yearRange.max ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Genre Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Genres</label>
              <div className="flex flex-wrap gap-2">
                {availableGenres.map((genre) => (
                  <Button
                    key={genre}
                    variant={filters.selectedGenres.includes(genre) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
            </div>

            {/* Year Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From Year</label>
                <select
                  value={filters.yearRange.min}
                  onChange={(e) => updateFilters({ yearRange: { ...filters.yearRange, min: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">Any Year</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To Year</label>
                <select
                  value={filters.yearRange.max}
                  onChange={(e) => updateFilters({ yearRange: { ...filters.yearRange, max: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">Any Year</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating Range */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Rating: {filters.ratingRange.min} - {filters.ratingRange.max}
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.ratingRange.min}
                  onChange={(e) =>
                    updateFilters({
                      ratingRange: { ...filters.ratingRange, min: Number.parseFloat(e.target.value) },
                    })
                  }
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.ratingRange.max}
                  onChange={(e) =>
                    updateFilters({
                      ratingRange: { ...filters.ratingRange, max: Number.parseFloat(e.target.value) },
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Sort and Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="year">Newest First</option>
                  <option value="title">A-Z</option>
                  <option value="runtime">Runtime</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => updateFilters({ language: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">All Languages</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {hasActiveFilters ? "Filters applied" : "No filters applied"}
              </span>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {filters.searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {filters.searchQuery}
              <button onClick={() => updateFilters({ searchQuery: "" })} className="ml-1 hover:text-red-600">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.selectedGenres.map((genre) => (
            <Badge key={genre} variant="secondary" className="flex items-center gap-1">
              {genre}
              <button onClick={() => toggleGenre(genre)} className="ml-1 hover:text-red-600">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {(filters.yearRange.min || filters.yearRange.max) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Year: {filters.yearRange.min || "Any"} - {filters.yearRange.max || "Any"}
              <button
                onClick={() => updateFilters({ yearRange: { min: "", max: "" } })}
                className="ml-1 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
