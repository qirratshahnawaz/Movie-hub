"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Film, Search, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/tv-shows", label: "TV Shows" },
    { href: "/genres", label: "Genres" },
    { href: "/trending", label: "Trending" },
    { href: "/reviews", label: "Reviews" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold">MovieHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-red-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </form>
          </div>

          {/* User Actions */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div> */}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search movies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </form>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium hover:text-red-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile User Actions */}
                  {/* <div className="flex flex-col space-y-4 pt-6 border-t">
                    <Button variant="ghost" className="justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Favorites
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Watchlist
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </div> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
