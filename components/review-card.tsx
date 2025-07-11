"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown, Flag, Edit, Trash2, AlertTriangle } from "lucide-react"
import { type Review, useReviewsStore } from "@/lib/reviews-store"
import { formatDistanceToNow } from "date-fns"

interface ReviewCardProps {
  review: Review
  onEdit?: (review: Review) => void
  showMovieTitle?: boolean
}

export function ReviewCard({ review, onEdit, showMovieTitle = false }: ReviewCardProps) {
  const [showFullContent, setShowFullContent] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const { voteHelpful, deleteReview, currentUser } = useReviewsStore()

  const isOwnReview = currentUser?.id === review.userId
  const contentPreview = review.content.slice(0, 200)
  const needsTruncation = review.content.length > 200

  const handleVote = (helpful: boolean) => {
    if (!hasVoted) {
      voteHelpful(review.id, helpful)
      setHasVoted(true)
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(review.id)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{review.userName}</h4>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                {review.updatedAt !== review.createdAt && " (edited)"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isOwnReview && (
              <>
                <Button variant="ghost" size="sm" onClick={() => onEdit?.(review)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Rating and Title */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(review.rating)}</div>
            <span className="font-semibold text-lg">{review.rating}/10</span>
          </div>
          <h3 className="text-lg font-bold">{review.title}</h3>
        </div>

        {/* Spoiler Warning */}
        {review.spoilerWarning && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800 dark:text-yellow-200">This review contains spoilers</span>
          </div>
        )}

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {showFullContent || !needsTruncation ? review.content : `${contentPreview}...`}
          </p>
          {needsTruncation && (
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600 hover:text-blue-800"
              onClick={() => setShowFullContent(!showFullContent)}
            >
              {showFullContent ? "Show less" : "Read more"}
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote(true)}
                disabled={hasVoted}
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{review.helpfulVotes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote(false)}
                disabled={hasVoted}
                className="flex items-center gap-1"
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {review.helpfulVotes} of {review.totalVotes} found this helpful
            </span>
          </div>

          {showMovieTitle && <Badge variant="outline">Movie Review</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}
