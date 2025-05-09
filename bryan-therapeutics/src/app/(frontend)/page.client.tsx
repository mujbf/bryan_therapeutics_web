'use client'
import React, { useState, useEffect, useRef } from 'react'
import Text from './components/TextComponent'
import Button from './components/Button'
import CarouselItem from './components/CarouselItem'
import { Card, CardPostData } from '@/components/Card'
import ContactForm from './components/ContactForm'
import Link from 'next/link'
import Image from 'next/image'

import NavigationButton from './components/NavigationButton'

interface CarouselItemData {
  id: number
  title: string
  imageSrc: string
  altText: string
}

// Define the props type for the HomePage component
interface HomePageProps {
  recentPosts?: CardPostData[]
}

export default function HomePage({ recentPosts = [] }: HomePageProps) {
  // Add or update this at the top of your component
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Add this function to your component
  const handleImageLoad = () => {
    console.log('Image loaded successfully')
    setIsLoaded(true)
  }

  // Add this function to your component to handle image loading errors
  const handleImageError = () => {
    console.error('Failed to load image: /bg/logo.webp')
    setImageError(true)
    // Still set isLoaded to true to prevent layout issues
    setIsLoaded(true)
  }

  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [itemsPerView, setItemsPerView] = useState<number>(3.5)
  const [itemWidth, setItemWidth] = useState<number>(0)

  // Sample data for carousel items
  const carouselItems: CarouselItemData[] = [
    {
      id: 1,
      title: 'Events',
      imageSrc: '/images/carousel.webp',
      altText: 'Q4 Earnings Report',
    },
    {
      id: 2,
      title: 'Presentations',
      imageSrc: '/images/carousel.webp',
      altText: 'Annual Financial Report',
    },
    {
      id: 3,
      title: 'Press Releases',
      imageSrc: '/images/carousel.webp',
      altText: 'Investor Presentation',
    },
    {
      id: 4,
      title: 'SEC Filings',
      imageSrc: '/images/carousel.webp',
      altText: 'ESG Report',
    },
    {
      id: 5,
      title: 'Sample 1',
      imageSrc: '/images/carousel.webp',
      altText: 'Shareholder Meeting',
    },
    {
      id: 6,
      title: 'Sample 2',
      imageSrc: '/images/carousel.webp',
      altText: 'Financial Outlook',
    },
  ]

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = (): void => {
      if (window.innerWidth < 640) {
        setItemsPerView(1.2) // Mobile: 1 item + peek
      } else if (window.innerWidth < 768) {
        setItemsPerView(2.2) // Small tablets: 2 items + peek
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2.5) // Tablets: 2.5 items
      } else {
        setItemsPerView(3.5) // Desktop: 3.5 items
      }
    }

    // Set initial value
    updateItemsPerView()

    // Update when window resizes
    window.addEventListener('resize', updateItemsPerView)

    return () => {
      window.removeEventListener('resize', updateItemsPerView)
    }
  }, [])

  // Calculate item width when carousel container changes
  useEffect(() => {
    if (carouselRef.current) {
      const calculateItemWidth = (): void => {
        const containerWidth = carouselRef.current?.clientWidth || 0
        const newItemWidth = containerWidth / itemsPerView
        setItemWidth(newItemWidth)
      }

      calculateItemWidth()
      window.addEventListener('resize', calculateItemWidth)

      return () => {
        window.removeEventListener('resize', calculateItemWidth)
      }
    }
  }, [carouselRef, itemsPerView])

  const scrollCarousel = (direction: 'left' | 'right'): void => {
    if (carouselRef.current) {
      const calculatedItemWidth = itemWidth || carouselRef.current.clientWidth / itemsPerView
      const newPosition =
        direction === 'left'
          ? Math.max(scrollPosition - calculatedItemWidth, 0)
          : Math.min(
              scrollPosition + calculatedItemWidth,
              (carouselItems.length - itemsPerView) * calculatedItemWidth,
            )

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      })

      setScrollPosition(newPosition)
    }
  }

  // Check if arrows should be disabled
  const isLeftDisabled = scrollPosition <= 0
  const isRightDisabled =
    !!carouselRef.current &&
    scrollPosition >=
      (carouselItems.length - itemsPerView) * (carouselRef.current.clientWidth / itemsPerView)

  return (
    <>
      {/* Hero Gradient */}
      <div
        className="relative h-screen w-full bg-auto md:bg-cover bg-center overflow-hidden mt-[-104px]"
        style={{ backgroundImage: 'url("/bg/home-hero.webp")' }}
      >
        {/* Overlay to improve text readability */}
        {/* <div className="absolute inset-0 bg-black opacity-0"></div> */}

        <div className="relative h-full w-full">
          <div className="container max-w-7xl mx-auto flex flex-col items-center md:items-start justify-center h-full py-16 px-4">
            {/* Text content */}
            <div className="h-[80%] w-full md:w-[60%] text-white z-10 flex flex-col gap-8 items-start justify-start md:justify-center">
              <Text variant="h1" color="text-white-100">
                Next-gen clinical advancement.
              </Text>
              <Text variant="body2" color="text-white-100">
                At Bryan Therapeutics, our mission is to perfect clinical therapies for safe and
                effective use, so they can be used to deliver life changing outcomes to people
                around the world.
              </Text>
              <NavigationButton
                href="/science"
                variant="button1"
                color="text-white/70 hover:text-white/100"
              >
                See how far we&apos;ve come
              </NavigationButton>
            </div>

            {/* Image positioned at bottom right with animation */}
            <div className="absolute bottom-0 md:bottom-36 right-0 z-20 h-auto max-h-[50%]">
              {imageError ? (
                <div className="bg-gray-200 w-[80vw] md:w-[40vw] 2xl:w-[35vw] h-[200px] rounded flex items-center justify-center">
                  <p className="text-gray-500">Image not found</p>
                </div>
              ) : (
                <Image
                  src="/bg/logo.webp"
                  alt="Product showcase"
                  width={690}
                  height={690}
                  className={`w-[80vw] md:w-[40vw] 2xl:w-[35vw] object-contain transition-all duration-1000 ease-out ${
                    isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mission 1 */}
      <div className="h-auto w-screen bg-[#0E2154] z-10">
        <div className="container max-w-7xl mx-auto px-4 py-8 md:py-20 flex flex-col gap-6 md:gap-15">
          <Text variant="h2" color="text-[#FFFFFF]">
            Our Mission
          </Text>
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-20">
            <Image
              src="/images/mission.webp"
              alt="Product showcase"
              width={456}
              height={600}
              className="w-full md:w-[40%]"
            />
            <div className="w-full md:w-[60%] flex flex-col gap-6 md:gap-16">
              <div className="flex flex-col items-start gap-4 md:gap-6">
                <Text variant="body2" color="text-[#FFFFFF]">
                  Our mission is to transform lives through groundbreaking research and the
                  development of drugs that produce and restore nitric oxide in the human body. We
                  believe in a future where safe and effective therapies that get to the root cause
                  of disease will eliminate human disease and suffering.
                </Text>
                <NavigationButton href="/about" variant="button1" color="text-[#FFFFFF]">
                  What drives us
                </NavigationButton>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="w-full md:w-1/2 flex flex-col gap-2 md:gap-4">
                  <Text variant="body3" color="text-[#6BB0FF]">
                    Innovation
                  </Text>
                  <Text variant="body3" color="text-[#6BB0FF]">
                    We are committed to transforming lives through groundbreaking research and
                    natural products that generate and restore nitric oxide in the human body.
                  </Text>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-2 md:gap-4">
                  <Text variant="body3" color="text-[#6BB0FF]">
                    Accessibility
                  </Text>
                  <Text variant="body3" color="text-[#6BB0FF]">
                    We believe in a future where health is accessible to all, and we strive to make
                    that future a reality.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Science Sec */}
      <div className="h-auto md:h-screen w-screen bg-[#AE0339] -z-10">
        <div className="container max-w-7xl mx-auto px-4 py-8 md:py-20 flex flex-col gap-6 md:gap-15 items-start">
          <div className="w-full md:w-[40%] flex flex-col items-start gap-4 md:gap-6">
            <Text variant="h2" color="text-[#FFFFFF]" className="mb-6 md:mb-14">
              The Science
            </Text>
            <Text variant="body2" color="text-[#FFFFFF]">
              Nitric oxide (NO) is a vital molecule produced by the human body, recognized for its
              critical role in cellular functions, including vasodilation and oxygen delivery; its
              significance was underscored when three US scientists received the Nobel Prize in
              Physiology or Medicine in 1998 for its discovery. Our R&D efforts are focused on
              bringing various Nitric Oxide-based treatments to market, with each at various stages
              of regulatory approval.
            </Text>
            <NavigationButton href="/science" variant="button1" color="text-[#FFFFFF]">
              What drives us
            </NavigationButton>
          </div>
        </div>
        <div className="flex justify-end mr-8 md:mr-20 mt-0 md:mt-[-8%] ">
          <Image
            src="/images/science.webp"
            alt="Product showcase"
            width={6086}
            height={2770}
            className="w-[80vw] md:w-[50vw] 2xl:w-[45vw] hidden md:block"
          />
        </div>
      </div>

      {/* Recent Posts Section */}
      {recentPosts && recentPosts.length > 0 && (
        <div className="container max-w-7xl mx-auto px-4 py-8 md:py-20 flex flex-col items-center">
          <Text variant="h2" color="text-[#2E4EA1]" align="center" className="mb-6 md:mb-16">
            Resources
          </Text>

          <Text variant="body2" color="text-[#535353]" align="center" className="mb-6 md:mb-16">
            Read though our Press Room for the latest insights into our research and our mentions in
            the media.
          </Text>
          <Link href="/posts" className="inline-flex items-center">
            <NavigationButton
              href="/posts"
              variant="button1"
              color="text-[#535353]"
              className="mb-6 md:mb-16"
            >
              Browse
            </NavigationButton>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {recentPosts.map((post, index) => {
              if (typeof post === 'object' && post !== null) {
                return (
                  <div className="col-span-1" key={`latest-post-${index}`}>
                    <Card className="h-full" doc={post} relationTo="posts" showCategories />
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      )}

      {/* Investors */}
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-12 lg:py-20 flex flex-col gap-4 md:gap-8 lg:gap-12 items-start">
        <Text variant="h2" color="text-[#2E4EA1]">
          Investors
        </Text>

        <div className="flex flex-col sm:flex-row justify-between w-full items-start gap-2 sm:gap-0">
          <Text
            variant="body2"
            color="text-[#535353]"
            className="text-center sm:text-left"
            align="left"
          >
            Financials, earnings updates, and more.
          </Text>
          <NavigationButton
            href="/about"
            variant="button1"
            color="text-[#535353]"
            className="mt-2 sm:mt-0"
          >
            More
          </NavigationButton>
        </div>

        <div className="w-full relative ">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x scroll-smooth p-4 md:p-8 rounded-2xl bg-[#D9EBFF]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {carouselItems.map((item) => (
              <div
                key={item.id}
                className="carousel-item flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <CarouselItem title={item.title} imageSrc={item.imageSrc} altText={item.altText} />
              </div>
            ))}
          </div>

          <div className="flex justify-start mt-4 gap-4">
            <button
              onClick={() => scrollCarousel('left')}
              className={`p-2 rounded-full focus:outline-none ${
                isLeftDisabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              disabled={isLeftDisabled}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className={`p-2 rounded-full focus:outline-none ${
                isRightDisabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              disabled={isRightDisabled}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contact */}
      <ContactForm formId="681050ce7d0608c6a2724875" />
    </>
  )
}
