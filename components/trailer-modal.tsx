"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"
import { VideoPlayer } from "./video-player"

interface TrailerModalProps {
  movie: {
    id: number
    title: string
    trailerUrl?: string
    posterImage: string
  }
  trigger?: React.ReactNode
}

export function TrailerModal({ movie, trigger }: TrailerModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!movie.trailerUrl) {
    return null
  }

  const defaultTrigger = (
    <Button className="bg-red-600 hover:bg-red-700 text-white">
      <Play className="h-4 w-4 mr-2" />
      Watch Trailer
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger || defaultTrigger}
      </div>

      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <DialogHeader className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="aspect-video">
          {movie.trailerUrl?.includes("youtube") || movie.trailerUrl?.includes("youtu.be") ? (
            <iframe
              src={
                movie.trailerUrl.includes("youtube.com/watch?v=")
                  ? `https://www.youtube.com/embed/${movie.trailerUrl.split("v=")[1]?.split("&")[0]}?autoplay=1&controls=1`
                  : movie.trailerUrl.includes("youtu.be/")
                    ? `https://www.youtube.com/embed/${movie.trailerUrl.split("youtu.be/")[1]?.split("?")[0]}?autoplay=1&controls=1`
                    : movie.trailerUrl
              }
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${movie.title} - Trailer`}
            />
          ) : (
            <VideoPlayer
              src={movie.trailerUrl || ""}
              poster={movie.posterImage}
              title={`${movie.title} - Trailer`}
              className="w-full h-full rounded-lg"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
