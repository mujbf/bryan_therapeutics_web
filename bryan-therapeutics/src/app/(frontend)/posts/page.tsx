import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
// import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

import Text from '../components/TextComponent'
// import Button from '../components/Button'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      excerpt: true,
    },
  })

  return (
    <div className="py-8 md:py-24">
      <PageClient />
      <div className="container mb-6 md:mb-16">
        <Text variant="h2" color="text-[#2E4EA1]" align="center" className="mb-6 md:mb-16">
          Resources
        </Text>
        <Text variant="body2" color="text-[#535353]" align="center">
          Read though our Press Room for the latest insights into our research and our mentions in
          the media.
        </Text>
      </div>

      {/* <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div> */}

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
