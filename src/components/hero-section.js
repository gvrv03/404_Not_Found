"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find What You've Lost, Return What You've Found</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Our AI-powered platform connects lost items with their owners through community collaboration and smart
            technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/AddStuff">
              <Button size="lg" variant="secondary">
                Report Lost Item
              </Button>
            </Link>
            <Link href="/AddStuff">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90">
                Report Found Item
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}