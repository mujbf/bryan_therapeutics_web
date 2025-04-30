import React from 'react'
import Text from './TextComponent'
import Button from './Button'
import Image from 'next/image'

interface CarouselItemProps {
  title: string
  imageSrc: string
  altText: string
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title, imageSrc, altText }) => {
  return (
    <div className="overflow-hidden flex flex-col h-full transition-transform duration-300 transform hover:-translate-y-1">
      <div className="p-4">
        <Text
          variant="h4"
          color="text-[#2E4EA1]"
          className="mb-1 sm:mb-2 text-base sm:text-lg md:text-xl font-semibold line-clamp-2"
        >
          {title}
        </Text>
      </div>

      <div className="relative">
        <Image
          src={imageSrc}
          alt={altText}
          layout="responsive"
          width={353} // Replace with actual image width
          height={415} // Replace with actual image height to maintain aspect ratio
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="mt-auto">
          <Button
            variant="button1"
            color="text-[#535353]"
            className="text-xs sm:text-sm md:text-base"
          >
            More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem
