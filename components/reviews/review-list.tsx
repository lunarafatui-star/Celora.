"use client"

import { useData } from "@/lib/data-store"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { Star } from "lucide-react"
import Link from "next/link"

export function ReviewList() {
  const { reviews, addReview } = useData()
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [targetName, setTargetName] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [rating, setRating] = useState(5)
  const [text, setText] = useState("")
  const [hoverRating, setHoverRating] = useState(0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !targetName.trim() || !text.trim()) return
    addReview({
      id: `rev-${Date.now()}`,
      reviewerId: user.id,
      reviewerName: user.username,
      targetId: `target-${Date.now()}`,
      targetName: targetName.trim(),
      rating,
      text: text.trim(),
      postTitle: postTitle.trim() || "General trade",
      createdAt: new Date().toISOString(),
    })
    setTargetName("")
    setPostTitle("")
    setRating(5)
    setText("")
    setShowForm(false)
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl italic text-foreground">Reviews</h1>
          <p className="mt-1 text-sm text-muted-foreground">Community feedback on completed trades</p>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        )}
        {!user && (
          <Link
            href="/login"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign in to Review
          </Link>
        )}
      </div>

      {/* Form */}
      {showForm && user && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold text-foreground">Write a Review</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="rev-target" className="mb-1 block text-sm font-medium text-foreground">
                Who are you reviewing?
              </label>
              <input
                id="rev-target"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Username of the buyer/seller"
                required
              />
            </div>
            <div>
              <label htmlFor="rev-post" className="mb-1 block text-sm font-medium text-foreground">
                Related listing (optional)
              </label>
              <input
                id="rev-post"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Selling Valorant Account"
              />
            </div>
          </div>

          {/* Star rating */}
          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-foreground">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="p-0.5"
                  aria-label={`${s} star${s !== 1 ? "s" : ""}`}
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      s <= (hoverRating || rating)
                        ? "fill-primary text-primary"
                        : "fill-transparent text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="rev-text" className="mb-1 block text-sm font-medium text-foreground">
              Your review
            </label>
            <textarea
              id="rev-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="How was your experience?"
              required
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews */}
      <div className="mt-8 flex flex-col gap-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="rounded-2xl border border-border/60 bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary uppercase">
                  {rev.reviewerName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{rev.reviewerName}</p>
                  <p className="text-xs text-muted-foreground">
                    reviewed <span className="font-medium text-foreground">{rev.targetName}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s <= rev.rating ? "fill-primary text-primary" : "fill-transparent text-border"
                    }`}
                  />
                ))}
              </div>
            </div>
            {rev.postTitle && (
              <p className="mt-3 inline-block rounded-full bg-secondary/50 px-3 py-1 text-xs text-secondary-foreground">
                {rev.postTitle}
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-foreground">{rev.text}</p>
            <p className="mt-3 text-xs text-muted-foreground">{formatDate(rev.createdAt)}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
