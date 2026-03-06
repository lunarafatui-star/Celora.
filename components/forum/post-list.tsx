"use client"

import Link from "next/link"
import { useData } from "@/lib/data-store"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { MessageSquare, Tag, Clock } from "lucide-react"

type Filter = "all" | "buying" | "selling"

export function PostList() {
  const { posts, addPost } = useData()
  const { user } = useAuth()
  const [filter, setFilter] = useState<Filter>("all")
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [game, setGame] = useState("")
  const [category, setCategory] = useState<"buying" | "selling">("selling")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !title.trim() || !game.trim() || !description.trim()) return
    addPost({
      id: `post-${Date.now()}`,
      title: title.trim(),
      game: game.trim(),
      category,
      description: description.trim(),
      price: price.trim() || "Negotiable",
      authorId: user.id,
      authorName: user.username,
      authorRole: user.role,
      createdAt: new Date().toISOString(),
      comments: [],
    })
    setTitle("")
    setGame("")
    setDescription("")
    setPrice("")
    setShowForm(false)
  }

  function formatDate(iso: string) {
    const d = new Date(iso)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl italic text-foreground">Forum</h1>
          <p className="mt-1 text-sm text-muted-foreground">Browse listings and discuss trades</p>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {showForm ? "Cancel" : "New Post"}
          </button>
        )}
        {!user && (
          <Link
            href="/login"
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign in to Post
          </Link>
        )}
      </div>

      {/* New post form */}
      {showForm && user && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold text-foreground">Create a Listing</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="post-title" className="mb-1 block text-sm font-medium text-foreground">Title</label>
              <input
                id="post-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Selling Valorant Immortal Account"
                required
              />
            </div>
            <div>
              <label htmlFor="post-game" className="mb-1 block text-sm font-medium text-foreground">Game</label>
              <input
                id="post-game"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Valorant, Genshin Impact"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCategory("selling")}
                  className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-medium transition-colors ${
                    category === "selling"
                      ? "border-primary bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  Selling
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("buying")}
                  className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-medium transition-colors ${
                    category === "buying"
                      ? "border-primary bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  Buying
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="post-price" className="mb-1 block text-sm font-medium text-foreground">Price</label>
              <input
                id="post-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. $50 or Negotiable"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="post-desc" className="mb-1 block text-sm font-medium text-foreground">Description</label>
            <textarea
              id="post-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe what you're buying or selling..."
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Post Listing
            </button>
          </div>
        </form>
      )}

      {/* Filter tabs */}
      <div className="mt-6 flex gap-2">
        {(["all", "buying", "selling"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="mt-6 flex flex-col gap-4">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/forum/${post.id}`}
            className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.category === "selling"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/30 text-accent-foreground"
                    }`}
                  >
                    {post.category === "selling" ? "Selling" : "Buying"}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    {post.game}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              </div>
              <span className="shrink-0 rounded-xl bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-foreground">
                {post.price}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase">
                  {post.authorName.charAt(0)}
                </div>
                {post.authorName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {post.comments.length} {post.comments.length === 1 ? "reply" : "replies"}
              </span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">No listings found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
