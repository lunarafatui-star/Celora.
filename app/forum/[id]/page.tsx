"use client"

import { Nav } from "@/components/nav"
import { PostDetail } from "@/components/forum/post-detail"
import { use } from "react"

export default function ForumPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <PostDetail postId={id} />
      </main>
    </div>
  )
}
