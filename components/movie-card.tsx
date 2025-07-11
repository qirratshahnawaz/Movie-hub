"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Play, Heart, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TrailerModal } from "@/components/trailer-modal"
import { useFavoritesStore } from "@/lib/favorites-store"

interface Movie {
  id: number
  title: string
  posterImage: string
  rating: number
  releaseDate: string
  genres: string[]
}

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const {
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
    addToWishlist,
    removeFromWishlist,
    isFavorite,
    isInWatchlist,
    isInWishlist,
  } = useFavoritesStore()

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="p-0 relative">
        <Link href={`/movie/${movie.id}`}>
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={movie.posterImage || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <TrailerModal
                movie={movie}
                trigger={
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Play className="h-4 w-4 mr-1" />
                    Watch
                  </Button>
                }
              />
            </div>

            {/* Rating Badge */}
            <div className="absolute top-2 left-2">
              <Badge className="bg-black/80 text-white border-0">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {movie.rating}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className={`h-8 w-8 p-0 ${isFavorite(movie.id) ? "bg-red-600 text-white" : ""}`}
                onClick={handleFavoriteClick}
              >
                <Heart className={`h-3 w-3 ${isFavorite(movie.id) ? "fill-current" : ""}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className={`h-8 w-8 p-0 ${isInWatchlist(movie.id) ? "bg-blue-600 text-white" : ""}`}
                onClick={handleWatchlistClick}
              >
                <Bookmark className={`h-3 w-3 ${isInWatchlist(movie.id) ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </Link>

        <div className="p-4">
          <Link href={`/movie/${movie.id}`}>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-red-600 transition-colors">
              {movie.title}
            </h3>
          </Link>

          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{movie.releaseDate}</p>

          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
