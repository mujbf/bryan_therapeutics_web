import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
// import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Linkedin } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto w-full bg-[#565656] text-white px-4 py-8 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-10">
        {/* Row 1: Logo and Menu */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <Link className="flex items-center mb-4 md:mb-0" href="/">
            <Logo />
          </Link>

          {/* Menu Links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white hover:text-gray-300" key={i} {...link} />
            })}
          </div>
        </div>

        {/* Row 2: Address and LinkedIn */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm">
          <p className="text-white mb-4 md:mb-0">
            Bryan Therapeutics Inc.,
            <br /> 2407 South Congress Ave E134, Austin, TX 78704
          </p>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-blue-400 transition"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Row 3: Copyright and Policies */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs pt-4">
          <p className="mb-2 md:mb-0 text-white">
            Site by{' '}
            <a href="https://www.magicunbound.co/" className="hover:text-gray-300">
              Magic Unbound
            </a>
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy">
              <span className="text-white hover:text-gray-300">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="text-white hover:text-gray-300">Terms & Conditions</span>
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
