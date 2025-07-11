"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Heart, Bookmark, Star } from "lucide-react"
import { useFavoritesStore } from "@/lib/favorites-store"
import { useState } from "react"

export default function FavoritesPage() {
  const { favorites, watchlist, wishlist } = useFavoritesStore()
  const [activeTab, setActiveTab] = useState("favorites")

  const getCurrentList = () => {
    switch (activeTab) {
      case "favorites":
        return favorites
      case "watchlist":
        return watchlist
      case "wishlist":
        return wishlist
      default:
        return favorites
    }
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case "favorites":
        return "My Favorites"
      case "watchlist":
        return "My Watchlist"
      case "wishlist":
        return "My Wishlist"
      default:
        return "My Favorites"
    }
  }

  const currentList = getCurrentList()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{getTabTitle()}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your saved movies and shows</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "favorites" ? "default" : "outline"}
            onClick={() => setActiveTab("favorites")}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Favorites ({favorites.length})
          </Button>
          <Button
            variant={activeTab === "watchlist" ? "default" : "outline"}
            onClick={() => setActiveTab("watchlist")}
            className="flex items-center gap-2"
          >
            <Bookmark className="h-4 w-4" />
            Watchlist ({watchlist.length})
          </Button>
          <Button
            variant={activeTab === "wishlist" ? "default" : "outline"}
            onClick={() => setActiveTab("wishlist")}
            className="flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            Wishlist ({wishlist.length})
          </Button>
        </div>

        {/* Content */}
        {currentList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {currentList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              {activeTab === "favorites" && <Heart className="h-16 w-16 mx-auto text-gray-400" />}
              {activeTab === "watchlist" && <Bookmark className="h-16 w-16 mx-auto text-gray-400" />}
              {activeTab === "wishlist" && <Star className="h-16 w-16 mx-auto text-gray-400" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">No movies in your {activeTab}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start adding movies to your {activeTab} to see them here
            </p>
            <Button onClick={() => (window.location.href = "/movies")}>Browse Movies</Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
