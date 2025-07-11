"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ReviewCard } from "@/components/review-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Star, TrendingUp, User } from "lucide-react"
import { useReviewsStore } from "@/lib/reviews-store"
import { mockMovies } from "@/lib/mock-data"

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "my-reviews">("all")
  const { reviews, currentUser, getReviewsByUser } = useReviewsStore()

  const allReviews = reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const myReviews = currentUser ? getReviewsByUser(currentUser.id) : []

  const getMovieTitle = (movieId: number) => {
    const movie = mockMovies.find((m) => m.id === movieId)
    return movie?.title || "Unknown Movie"
  }

  const currentReviews = activeTab === "all" ? allReviews : myReviews

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Movie Reviews</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Read and discover what others think about the latest movies
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{reviews.length}</p>
                  <p className="text-gray-600 dark:text-gray-400">Total Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {reviews.length > 0
                      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                      : "0"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{reviews.reduce((sum, r) => sum + r.helpfulVotes, 0)}</p>
                  <p className="text-gray-600 dark:text-gray-400">Helpful Votes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            onClick={() => setActiveTab("all")}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            All Reviews ({allReviews.length})
          </Button>
          {currentUser && (
            <Button
              variant={activeTab === "my-reviews" ? "default" : "outline"}
              onClick={() => setActiveTab("my-reviews")}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              My Reviews ({myReviews.length})
            </Button>
          )}
        </div>

        {/* User Profile Card (for My Reviews tab) */}
        {activeTab === "my-reviews" && currentUser && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{currentUser.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Member since {new Date(currentUser.joinedDate).getFullYear()}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Badge variant="secondary">{currentUser.totalReviews} Reviews</Badge>
                    <Badge variant="secondary">{currentUser.helpfulVotes} Helpful Votes</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        {currentReviews.length > 0 ? (
          <div className="space-y-6">
            {currentReviews.map((review) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{getMovieTitle(review.movieId)}</Badge>
                </div>
                <ReviewCard review={review} showMovieTitle={activeTab === "my-reviews"} />
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {activeTab === "all" ? "No reviews yet" : "You haven't written any reviews yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {activeTab === "all"
                  ? "Be the first to share your thoughts about movies!"
                  : "Start reviewing movies to share your opinions with the community."}
              </p>
              <Button onClick={() => (window.location.href = "/movies")}>Browse Movies</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
