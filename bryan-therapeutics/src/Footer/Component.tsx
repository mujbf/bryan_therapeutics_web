import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
// import { CMSLink } from '@/components/Link'
// import { Logo } from '@/components/Logo/Logo'
import { Linkedin } from 'lucide-react'
import Text from '@/app/(frontend)/components/TextComponent'
import Image from 'next/image'

// Static nav items - same as in navbar
const STATIC_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Science', href: '/science' },
  { label: 'Resources', href: '/posts' }, // Blog page
]

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto w-full bg-[#565656] text-white px-4 py-8 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-10">
        {/* Row 1: Logo and Menu */}
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-4 md:mb-0">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={464}
              height={117}
              className="h-12 w-auto"
            />
          </Link>

          {/* Navbar Menu Links */}
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            {STATIC_NAV.map((item, i) => (
              <Link key={i} href={item.href} className="text-white hover:text-gray-300">
                <Text variant="body3" className="text-white hover:text-gray-300">
                  {item.label}
                </Text>
              </Link>
            ))}
            <Link href="/contact" className="text-white hover:text-gray-300">
              <Text variant="body3" className="text-white hover:text-gray-300">
                Contact Us
              </Text>
            </Link>
          </div>
        </div>

        {/* Row 2: Address and LinkedIn */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-center md:text-left">
          <Text variant="body3" className="text-white mb-4 md:mb-0 text-center md:text-left">
            Bryan Therapeutics Inc.,
            <br /> 2407 South Congress Ave E134, Austin, TX 78704
          </Text>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start space-x-2 hover:text-blue-400 transition"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Row 3: Copyright and Policies */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs pt-4 text-center md:text-left">
          <Text variant="body4" className="mb-2 md:mb-0 text-white text-center md:text-left">
            Site by{' '}
            <a href="https://www.magicunbound.co/" className="hover:text-gray-300">
              Magic Unbound
            </a>
          </Text>
          <div className="flex space-x-6 justify-center md:justify-start">
            <Link href="/privacy">
              <Text variant="body4" className="text-white hover:text-gray-300">
                Privacy Policy
              </Text>
            </Link>
            <Link href="/terms">
              <Text variant="body4" className="text-white hover:text-gray-300">
                Terms & Conditions
              </Text>
            </Link>
          </div>
        </div>

        {/* Theme Selector (Preserved from original) */}
        {/* <div className="flex justify-end">
          <ThemeSelector />
        </div> */}
      </div>
    </footer>
  )
}
