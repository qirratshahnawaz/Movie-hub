"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Calendar, Clock, Heart, Share2, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { mockMovies, getMovieById } from "@/lib/mock-data"
import { TrailerModal } from "@/components/trailer-modal"
import { useFavoritesStore } from "@/lib/favorites-store"
import { ReviewsSection } from "@/components/reviews-section"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movie = getMovieById(Number.parseInt(params.id))

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

  // Add handler functions
  const handleFavoriteClick = () => {
    if (!movie) return
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  const handleWatchlistClick = () => {
    if (!movie) return
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  const handleWishlistClick = () => {
    if (!movie) return
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id)
    } else {
      addToWishlist(movie)
    }
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const relatedMovies = mockMovies
    .filter((m) => m.id !== movie.id && m.genres.some((genre) => movie.genres.includes(genre)))
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={movie.backdropImage || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      </section>

      {/* Movie Details */}
      <section className="relative -mt-32 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Movie Poster */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden">
                <Image
                  src={movie.posterImage || "/placeholder.svg"}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full h-auto"
                />
              </Card>
            </div>

            {/* Movie Info */}
            <div className="lg:col-span-2 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-red-600 text-white">
                    {genre}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

              <div className="flex items-center gap-6 mb-6 text-gray-300">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-white">{movie.rating}</span>
                  <span>/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.releaseDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.runtime}</span>
                </div>
              </div>

              <p className="text-lg text-gray-200 mb-8 leading-relaxed">{movie.overview}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <TrailerModal movie={movie} />
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-white text-white hover:bg-white hover:text-black bg-transparent ${
                    isFavorite(movie.id) ? "bg-red-600 border-red-600" : ""
                  }`}
                  onClick={handleFavoriteClick}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite(movie.id) ? "fill-current" : ""}`} />
                  {isFavorite(movie.id) ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-white text-white hover:bg-white hover:text-black bg-transparent ${
                    isInWatchlist(movie.id) ? "bg-blue-600 border-blue-600" : ""
                  }`}
                  onClick={handleWatchlistClick}
                >
                  <Bookmark className={`h-5 w-5 mr-2 ${isInWatchlist(movie.id) ? "fill-current" : ""}`} />
                  {isInWatchlist(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-white text-white hover:bg-white hover:text-black bg-transparent ${
                    isInWishlist(movie.id) ? "bg-green-600 border-green-600" : ""
                  }`}
                  onClick={handleWishlistClick}
                >
                  <Share2 className={`h-5 w-5 mr-2 ${isInWishlist(movie.id) ? "fill-current" : ""}`} />
                  {isInWishlist(movie.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Director</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Language</h3>
                  <p className="text-gray-300">{movie.language}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cast Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movie.cast.map((actor, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={`/placeholder.svg?height=300&width=200`}
                    alt={actor.name}
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-sm">{actor.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{actor.character}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {relatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ReviewsSection movieId={movie.id} movieTitle={movie.title} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
