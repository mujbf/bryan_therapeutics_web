'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import Text from '@/app/(frontend)/components/TextComponent'
import { ArrowRight } from 'lucide-react'

// Updated to include excerpt
export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'excerpt'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  // Extract excerpt along with other fields
  const { slug, categories, meta, title, excerpt } = doc || {}
  const { description, image: metaImage } = meta || {}

  // Choose excerpt if available, fall back to meta description if not
  const displayText = excerpt || (description && description.replace(/\s/g, ' '))

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  return (
    <article className={cn('flex flex-col gap-4 hover:cursor-pointer', className)} ref={card.ref}>
      <div className="overflow-hidden rounded-lg w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} size="33vw" className="w-full object-cover" />
        )}
      </div>

      {showCategories && hasCategories && (
        <div className="text-[#6BB0FF]">
          {categories?.map((category, index) => {
            if (typeof category === 'object') {
              const { title: titleFromCategory } = category
              const categoryTitle = titleFromCategory || 'Untitled category'
              const isLast = index === categories.length - 1

              return (
                <Fragment key={index}>
                  {categoryTitle}
                  {!isLast && <Fragment>, &nbsp;</Fragment>}
                </Fragment>
              )
            }
            return null
          })}
        </div>
      )}

      {titleToUse && (
        <Link href={href} ref={link.ref}>
          <Text variant="h4" color="text-[#6BB0FF]">
            {titleToUse}
          </Text>
        </Link>
      )}

      {displayText && (
        <Text variant="body3" color="text-[#535353]">
          {displayText}
        </Text>
      )}

      <div>
        <Link
          href={href}
          ref={link.ref}
          className="flex items-center text-[#535353] py-2 gap-2 hover:gap-3 font-medium transition-all duration-300 ease-in-out"
          style={{ fontFamily: '"Instrument Sans", sans-serif' }}
        >
          Read More
          <ArrowRight size={18} className="transition-all duration-300" />
        </Link>
      </div>
    </article>
  )
}
