'use client'
import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '@/app/(frontend)/components/Button'
import Image from 'next/image'

// Static nav items
const STATIC_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Science', href: '/science' },
  { label: 'Resources', href: '/posts' }, // Blog page
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dynamicItems = data?.navItems || []

  return (
    <header className="w-full pt-6">
      <nav className="mx-auto max-w-7xl bg-white/60 backdrop-blur-sm rounded-2xl shadow-md py-4 px-6 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={464} height={117} className="h-12 w-auto" />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {STATIC_NAV.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="p-2 text-base md:text-xl font-normal tracking-tight text-[#1A1A1A] opacity-70 hover:opacity-100 relative group"
              style={{ fontFamily: '"Instrument Sans", sans-serif' }}
            >
              {item.label}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#1A1A1A] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"></div>
            </Link>
          ))}
          {dynamicItems.map((item, i) => (
            <div className="relative group">
              <CMSLink
                key={`cms-${i}`}
                {...item.link}
                appearance="link"
                className="opacity-70 hover:opacity-100"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#1A1A1A] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out"></div>
            </div>
          ))}
          <Link href="/contact">
            <Button
              variant="button2"
              className="text-[#E00047] hover:border-1 hover:border-[#E00047] rounded-lg md:text-xl nav-btn"
            >
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white shadow-md p-4 md:hidden z-50 rounded-lg">
            {STATIC_NAV.map((item, i) => (
              <Link key={i} href={item.href} className="block py-2 border-b border-gray-100">
                {item.label}
              </Link>
            ))}
            {dynamicItems.map((item, i) => (
              <div key={`cms-mobile-${i}`} className="py-2 border-b border-gray-100">
                <CMSLink {...item.link} appearance="link" />
              </div>
            ))}
            <Link href="/contact" className="block py-2 ">
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default HeaderNav
