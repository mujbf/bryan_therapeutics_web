// Create a new file in the same directory as your page.tsx, call it page.server.tsx
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import HomePage from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PageServer() {
  const payload = await getPayload({ config: configPromise })

  // Fetch just the 2 most recent posts
  const recentPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 2,
    sort: '-createdAt', // Sort by newest first
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      excerpt: true,
    },
  })

  // Pass the recent posts to your client component
  return <HomePage recentPosts={recentPosts.docs} />
}
