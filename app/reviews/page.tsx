"use client"

import { Nav } from "@/components/nav"
import { ReviewList } from "@/components/reviews/review-list"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <ReviewList />
      </main>
    </div>
  )
}
