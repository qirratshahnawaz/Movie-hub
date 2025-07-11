"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, Filter } from "lucide-react"
import { ReviewCard } from "./review-card"
import { ReviewForm } from "./review-form"
import { type Review, useReviewsStore } from "@/lib/reviews-store"

interface ReviewsSectionProps {
  movieId: number
  movieTitle: string
}

export function ReviewsSection({ movieId, movieTitle }: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "helpful" | "rating">("newest")
  const [filterRating, setFilterRating] = useState<number | null>(null)

  const { getReviewsByMovie, getMovieRatingStats, currentUser } = useReviewsStore()

  const allReviews = getReviewsByMovie(movieId)
  const ratingStats = getMovieRatingStats(movieId)

  // Check if current user has already reviewed this movie
  const userReview = currentUser ? allReviews.find((review) => review.userId === currentUser.id) : null

  // Filter and sort reviews
  const filteredReviews = allReviews
    .filter((review) => !filterRating || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "helpful":
          return b.helpfulVotes - a.helpfulVotes
        case "rating":
          return b.rating - a.rating
        default: // newest
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const handleEditReview = (review: Review) => {
    setEditingReview(review)
    setShowReviewForm(true)
  }

  const handleFormSubmit = () => {
    setShowReviewForm(false)
    setEditingReview(null)
  }

  const handleFormCancel = () => {
    setShowReviewForm(false)
    setEditingReview(null)
  }

  const renderRatingDistribution = () => {
    const maxCount = Math.max(...Object.values(ratingStats.ratingDistribution))

    return (
      <div className="space-y-2">
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => {
          const count = ratingStats.ratingDistribution[rating] || 0
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0

          return (
            <div key={rating} className="flex items-center gap-2 text-sm">
              <span className="w-6 text-right">{rating}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-600 dark:text-gray-400">{count}</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              Overall Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{ratingStats.averageRating}/10</div>
              <div className="flex justify-center mb-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(ratingStats.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Based on {ratingStats.totalReviews} reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {ratingStats.totalReviews > 0 ? (
              renderRatingDistribution()
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-4">No ratings yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Write Review Section */}
      {!showReviewForm && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Share Your Thoughts</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {userReview
                    ? "You've already reviewed this movie. You can edit your review below."
                    : "Have you watched this movie? Write a review to help others decide."}
                </p>
              </div>
              <Button onClick={() => setShowReviewForm(true)} disabled={!currentUser}>
                <MessageSquare className="h-4 w-4 mr-2" />
                {userReview ? "Edit Review" : "Write Review"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          movieId={movieId}
          movieTitle={movieTitle}
          editingReview={editingReview}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {/* Reviews List */}
      {allReviews.length > 0 && (
        <div className="space-y-6">
          {/* Filters and Sorting */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Sort by:</span>
                </div>

                <div className="flex gap-2">
                  {[
                    { value: "newest", label: "Newest" },
                    { value: "helpful", label: "Most Helpful" },
                    { value: "rating", label: "Highest Rating" },
                    { value: "oldest", label: "Oldest" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={sortBy === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(option.value as any)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm font-medium">Filter by rating:</span>
                  <select
                    value={filterRating || ""}
                    onChange={(e) => setFilterRating(e.target.value ? Number.parseInt(e.target.value) : null)}
                    className="px-2 py-1 border rounded text-sm bg-background"
                  >
                    <option value="">All Ratings</option>
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Stars
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Reviews ({filteredReviews.length})</h3>
              {filteredReviews.length !== allReviews.length && (
                <Badge variant="secondary">Filtered from {allReviews.length} total</Badge>
              )}
            </div>

            {filteredReviews.length > 0 ? (
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} onEdit={handleEditReview} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No reviews match your filters</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more reviews.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* No Reviews State */}
      {allReviews.length === 0 && !showReviewForm && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Be the first to share your thoughts about this movie!
            </p>
            <Button onClick={() => setShowReviewForm(true)} disabled={!currentUser}>
              Write the First Review
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
