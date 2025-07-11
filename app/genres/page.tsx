import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { mockMovies } from "@/lib/mock-data"

export default function GenresPage() {
  const genreData = [
    { name: "Action", image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", color: "bg-red-600" },
    {
      name: "Comedy",
      image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      color: "bg-yellow-600",
    },
    { name: "Drama", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", color: "bg-blue-600" },
    {
      name: "Horror",
      image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      color: "bg-purple-600",
    },
    { name: "Sci-Fi", image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", color: "bg-green-600" },
    { name: "Romance", image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", color: "bg-pink-600" },
    {
      name: "Thriller",
      image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
      color: "bg-gray-600",
    },
    {
      name: "Adventure",
      image: "https://image.tmdb.org/t/p/w500/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
      color: "bg-orange-600",
    },
    {
      name: "Animation",
      image: "https://image.tmdb.org/t/p/w500/ox4goZd956BxqJH6iLwhWPL9ct4.jpg",
      color: "bg-indigo-600",
    },
    { name: "Crime", image: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg", color: "bg-red-800" },
    {
      name: "Fantasy",
      image: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
      color: "bg-purple-800",
    },
    { name: "Family", image: "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg", color: "bg-green-500" },
  ]

  const getMovieCountByGenre = (genre: string) => {
    return mockMovies.filter((movie) => movie.genres.includes(genre)).length
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Browse by Genre</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover movies and TV shows by your favorite genres. From action-packed thrillers to heartwarming comedies.
          </p>
        </div>

        {/* Genres Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genreData.map((genre) => (
            <Link key={genre.name} href={`/genre/${genre.name.toLowerCase()}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={genre.image || "/placeholder.svg"}
                      alt={genre.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 ${genre.color} opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-2">{genre.name}</h3>
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {getMovieCountByGenre(genre.name)} movies
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Popular Genres Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Most Popular Genres</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genreData.slice(0, 3).map((genre) => (
              <Card key={genre.name} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${genre.color} flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">{genre.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{genre.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {getMovieCountByGenre(genre.name)} movies available
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
