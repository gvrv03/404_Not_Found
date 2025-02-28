"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link href="/search" className="hover:underline">
                Search
              </Link>
              <Link href="/map" className="hover:underline">
                Map
              </Link>
              <Link href="/leaderboard" className="hover:underline">
                Leaderboard
              </Link>
              <Link href="/how-it-works" className="hover:underline">
                How It Works
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-2">
              <Link href="/search" className="py-2 hover:underline">
                Search
              </Link>
              <Link href="/map" className="py-2 hover:underline">
                Map
              </Link>
              <Link href="/leaderboard" className="py-2 hover:underline">
                Leaderboard
              </Link>
              <Link href="/how-it-works" className="py-2 hover:underline">
                How It Works
              </Link>
              <div className="flex gap-2 mt-2">
                <Link href="/auth/login" className="w-full">
                  <Button variant="secondary" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find What You've Lost, Return What You've Found</h1>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
            Our AI-powered platform connects lost items with their owners through community collaboration and smart
            technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/report/lost">
              <Button size="lg" variant="secondary">
                Report Lost Item
              </Button>
            </Link>
            <Link href="/report/found">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Report Found Item
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
