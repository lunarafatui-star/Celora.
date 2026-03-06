"use client"

import { Nav } from "@/components/nav"
import { PostList } from "@/components/forum/post-list"

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <PostList />
      </main>
    </div>
  )
}
