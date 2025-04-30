'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import { Card, CardPostData } from '@/components/Card'
import { Media } from '@/components/Media'
import Link from 'next/link'
import Text from '@/app/(frontend)/components/TextComponent'
import { ArrowRight } from 'lucide-react'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  // Get the latest two posts
  const latestPosts = posts.slice(0, 2)
  // Get the rest of the posts
  const remainingPosts = posts.slice(2)

  console.log(
    'Received posts:',
    posts.map((post) => ({
      title: post.title,
      hasExcerpt: Boolean(post.excerpt),
      excerptValue: post.excerpt,
    })),
  )

  return (
    <div className={cn('container')}>
      {/* Latest Two Posts in Grid Format */}
      {latestPosts.length > 0 && (
        <div className="mb-16">
          {/* <h2 className="text-2xl font-bold mb-6">Latest Posts</h2> */}
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
            {latestPosts.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <div className="col-span-6" key={`latest-${index}`}>
                    <Card className="h-full" doc={result} relationTo="posts" showCategories />
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      )}
      <hr className="mb-6 md:mb-16" />
      {/* Remaining Posts in Row Format */}
      {remainingPosts.length > 0 && (
        <div>
          {/* <h2 className="text-2xl font-bold mb-6">All Posts</h2> */}
          <div className="flex flex-col gap-8">
            {remainingPosts.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                const { slug, categories, meta, title, excerpt } = result || {}
                const { description, image: metaImage } = meta || {}
                const displayText = excerpt || (description && description.replace(/\s/g, ' '))
                const hasCategories =
                  categories && Array.isArray(categories) && categories.length > 0
                const href = `/posts/${slug}`

                return (
                  <div className="w-full" key={`remaining-${index}`}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        {/* Left side - Image */}
                        <div className="overflow-hidden rounded-lg w-full">
                          {!metaImage && <div className="">No image</div>}
                          {metaImage && typeof metaImage !== 'string' && (
                            <Media
                              resource={metaImage}
                              size="33vw"
                              className="w-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                      <div className="md:w-2/3 flex flex-col justify-between">
                        {/* Right side - Content */}
                        <div className="flex flex-col gap-4">
                          {/* Categories */}
                          {hasCategories && (
                            <div className="text-[#6BB0FF]">
                              {categories?.map((category, index) => {
                                if (typeof category === 'object') {
                                  const { title: titleFromCategory } = category
                                  const categoryTitle = titleFromCategory || 'Untitled category'
                                  const isLast = index === categories.length - 1

                                  return (
                                    <React.Fragment key={index}>
                                      {categoryTitle}
                                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                                    </React.Fragment>
                                  )
                                }
                                return null
                              })}
                            </div>
                          )}

                          {/* Title */}
                          {title && (
                            <Link href={href}>
                              <Text variant="h4" color="text-[#6BB0FF]">
                                {title}
                              </Text>
                            </Link>
                          )}

                          {/* Excerpt */}
                          {displayText && (
                            <Text variant="body3" color="text-[#535353]">
                              {displayText}
                            </Text>
                          )}
                        </div>

                        {/* Read More Link */}
                        <div className="mt-4">
                          <Link
                            href={href}
                            className="flex items-center text-[#535353] py-2 gap-2 hover:gap-3 font-medium transition-all duration-300 ease-in-out"
                            style={{ fontFamily: '"Instrument Sans", sans-serif' }}
                          >
                            Read More
                            <ArrowRight size={18} className="transition-all duration-300" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8"></div>
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
