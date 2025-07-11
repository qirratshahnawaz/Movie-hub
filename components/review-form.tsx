"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Star } from "lucide-react"
import { type Review, useReviewsStore } from "@/lib/reviews-store"

interface ReviewFormProps {
  movieId: number
  movieTitle: string
  editingReview?: Review
  onSubmit?: () => void
  onCancel?: () => void
}

export function ReviewForm({ movieId, movieTitle, editingReview, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(editingReview?.rating || 0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState(editingReview?.title || "")
  const [content, setContent] = useState(editingReview?.content || "")
  const [spoilerWarning, setSpoilerWarning] = useState(editingReview?.spoilerWarning || false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addReview, updateReview, currentUser } = useReviewsStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser || rating === 0 || !title.trim() || !content.trim()) return

    setIsSubmitting(true)

    try {
      if (editingReview) {
        updateReview(editingReview.id, {
          rating,
          title: title.trim(),
          content: content.trim(),
          spoilerWarning,
        })
      } else {
        addReview({
          movieId,
          userId: currentUser.id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          rating,
          title: title.trim(),
          content: content.trim(),
          spoilerWarning,
          verified: false,
        })
      }

      // Reset form
      if (!editingReview) {
        setRating(0)
        setTitle("")
        setContent("")
        setSpoilerWarning(false)
      }

      onSubmit?.()
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 10 }, (_, i) => {
      const starValue = i + 1
      return (
        <button
          key={i}
          type="button"
          className="focus:outline-none"
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(starValue)}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              starValue <= (hoveredRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          />
        </button>
      )
    })
  }

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please sign in to write a review</p>
          <Button>Sign In</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingReview ? "Edit Review" : `Write a Review for ${movieTitle}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1 mb-2">{renderStars()}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{rating > 0 ? `${rating}/10` : "Click to rate"}</p>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Review Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your review in one line"
              maxLength={100}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/100 characters</p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Your Review <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              rows={6}
              maxLength={2000}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{content.length}/2000 characters</p>
          </div>

          {/* Spoiler Warning */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="spoiler"
              checked={spoilerWarning}
              onCheckedChange={(checked) => setSpoilerWarning(checked as boolean)}
            />
            <label htmlFor="spoiler" className="text-sm">
              This review contains spoilers
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0 || !title.trim() || !content.trim()}
              className="flex-1"
            >
              {isSubmitting ? "Submitting..." : editingReview ? "Update Review" : "Submit Review"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
