import { Film, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://image.tmdb.org/t/p/w1280/5YZbUmjbMa3ClvSW1Wj3Gdx803.jpg"
          alt="Footer background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold">MovieHub</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for movies and TV shows. Discover, watch, and enjoy the best entertainment
              content.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Movies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Movies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movies/popular" className="text-gray-400 hover:text-white transition-colors">
                  Popular Movies
                </Link>
              </li>
              <li>
                <Link href="/movies/trending" className="text-gray-400 hover:text-white transition-colors">
                  Trending Now
                </Link>
              </li>
              <li>
                <Link href="/movies/upcoming" className="text-gray-400 hover:text-white transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link href="/movies/top-rated" className="text-gray-400 hover:text-white transition-colors">
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Genres</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/genre/action" className="text-gray-400 hover:text-white transition-colors">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/genre/comedy" className="text-gray-400 hover:text-white transition-colors">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/genre/drama" className="text-gray-400 hover:text-white transition-colors">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/genre/horror" className="text-gray-400 hover:text-white transition-colors">
                  Horror
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
