"use client"

import { useData, type ForumPost } from "@/lib/data-store"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Tag, Clock, MessageSquare, Send } from "lucide-react"

export function PostDetail({ postId }: { postId: string }) {
  const { posts, addComment, conversations, addConversation } = useData()
  const { user } = useAuth()
  const router = useRouter()
  const [commentText, setCommentText] = useState("")

  const post = posts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Post not found.</p>
        <Link href="/forum" className="mt-4 inline-block text-sm text-primary hover:underline">
          Back to Forum
        </Link>
      </div>
    )
  }

  function formatDate(iso: string) {
    const d = new Date(iso)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !commentText.trim()) return
    addComment(postId, {
      id: `comment-${Date.now()}`,
      authorId: user.id,
      authorName: user.username,
      text: commentText.trim(),
      createdAt: new Date().toISOString(),
    })
    setCommentText("")
  }

  function handleMessage() {
    if (!user || !post) return
    // Check if conversation already exists between these two users about this post
    const existing = conversations.find(
      (c) =>
        c.postId === post.id &&
        c.participants.some((p) => p.id === user.id) &&
        c.participants.some((p) => p.id === post.authorId)
    )
    if (existing) {
      router.push(`/chat?conv=${existing.id}`)
      return
    }
    // Create new conversation
    const newConv = {
      id: `conv-${Date.now()}`,
      participants: [
        { id: user.id, name: user.username },
        { id: post.authorId, name: post.authorName },
      ],
      postId: post.id,
      postTitle: post.title,
      messages: [],
    }
    addConversation(newConv)
    router.push(`/chat?conv=${newConv.id}`)
  }

  return (
    <div>
      <Link href="/forum" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Forum
      </Link>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {/* Header */}
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
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatDate(post.createdAt)}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-foreground">{post.title}</h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary uppercase">
            {post.authorName.charAt(0)}
          </div>
          <span className="font-medium text-foreground">{post.authorName}</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs capitalize">{post.authorRole}</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            {post.price}
          </span>
          {user && user.id !== post.authorId && (
            <button
              onClick={handleMessage}
              className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Message {post.authorName}
            </button>
          )}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {post.description}
          </p>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <MessageSquare className="h-4 w-4" />
          Replies ({post.comments.length})
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          {post.comments.map((c) => (
            <div key={c.id} className="rounded-xl border border-border/60 bg-card p-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/30 text-xs font-bold text-accent-foreground uppercase">
                  {c.authorName.charAt(0)}
                </div>
                <span className="font-medium text-foreground">{c.authorName}</span>
                <span className="text-xs text-muted-foreground">{formatDate(c.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{c.text}</p>
            </div>
          ))}
          {post.comments.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">No replies yet. Be the first!</p>
          )}
        </div>

        {/* Comment form */}
        {user ? (
          <form onSubmit={handleComment} className="mt-4 flex gap-3">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Write a reply..."
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Reply
            </button>
          </form>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-border py-4 text-center">
            <Link href="/login" className="text-sm text-primary hover:underline">
              Sign in to reply
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
