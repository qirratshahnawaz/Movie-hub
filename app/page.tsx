import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MovieCard } from "@/components/movie-card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { mockMovies, featuredMovie } from "@/lib/mock-data"
import { TrailerModal } from "@/components/trailer-modal"

export default function HomePage() {
  const trendingMovies = mockMovies.slice(0, 6)
  const popularMovies = mockMovies.slice(6, 12)
  const upcomingMovies = mockMovies.slice(12, 18)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featuredMovie.backdropImage || "/placeholder.svg"}
            alt={featuredMovie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-red-600 text-white hover:bg-red-700">
                  Featured
                </Badge>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-white font-medium">{featuredMovie.rating}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{featuredMovie.title}</h1>

              <p className="text-lg text-gray-200 mb-6 leading-relaxed">{featuredMovie.overview}</p>

              <div className="flex items-center gap-4 mb-8 text-gray-300">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{featuredMovie.releaseDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{featuredMovie.runtime}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <TrailerModal movie={featuredMovie} />
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search for movies, TV shows, actors..." className="pl-10 py-3 text-lg" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link href="/movies/trending">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Movies */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular Movies</h2>
            <Link href="/movies/popular">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Movies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Coming Soon</h2>
            <Link href="/movies/upcoming">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Latest Movies</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Get notified about new releases, exclusive content, and special offers.
          </p>

          <div className="max-w-md mx-auto flex gap-2">
            <Input placeholder="Enter your email" className="bg-white" />
            <Button className="bg-black hover:bg-gray-800 text-white">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
