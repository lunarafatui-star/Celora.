"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useData, type Conversation } from "@/lib/data-store"
import { useAuth } from "@/lib/auth-context"
import { Shield, AlertTriangle, MessageSquare, Eye, Users } from "lucide-react"
import Link from "next/link"

const RESTRICTED_KEYWORDS = ["discord", "paypal.me", "venmo", "cashapp", "telegram", "whatsapp", "skype"]

function isFlagged(text: string): boolean {
  const lower = text.toLowerCase()
  return RESTRICTED_KEYWORDS.some((kw) => lower.includes(kw)) || /https?:\/\//.test(lower)
}

export function AdminDashboard() {
  const { user } = useAuth()
  const { conversations, reviews, posts } = useData()
  const [selectedConv, setSelectedConv] = useState<string | null>(null)

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Shield className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-4 text-sm text-muted-foreground">Admin access required.</p>
        <Link href="/login" className="mt-3 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">
          Sign In as Admin
        </Link>
      </div>
    )
  }

  const flaggedConvs = conversations.filter((c) =>
    c.messages.some((m) => isFlagged(m.text))
  )

  const totalMessages = conversations.reduce((acc, c) => acc + c.messages.length, 0)
  const selected = conversations.find((c) => c.id === selectedConv)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="font-serif text-3xl italic text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Monitor all platform activity and chat transcripts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Conversations" value={conversations.length} />
        <StatCard icon={MessageSquare} label="Total Messages" value={totalMessages} />
        <StatCard icon={AlertTriangle} label="Flagged Chats" value={flaggedConvs.length} accent />
        <StatCard icon={Eye} label="Forum Posts" value={posts.length} />
      </div>

      {/* Chat monitor */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Chat Transcripts</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a conversation to view the full transcript. Flagged messages are highlighted.
        </p>

        <div className="mt-4 flex overflow-hidden rounded-2xl border border-border bg-card" style={{ minHeight: 480 }}>
          {/* Conversation list */}
          <div className="w-80 shrink-0 overflow-y-auto border-r border-border">
            {conversations.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">No conversations yet.</p>
            ) : (
              conversations.map((conv) => {
                const hasFlagged = conv.messages.some((m) => isFlagged(m.text))
                const names = conv.participants.map((p) => p.name).join(" & ")
                const lastMsg = conv.messages[conv.messages.length - 1]
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConv(conv.id)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border/40 px-4 py-4 text-left transition-colors hover:bg-muted/50",
                      selectedConv === conv.id && "bg-secondary/40",
                      hasFlagged && "border-l-2 border-l-destructive"
                    )}
                  >
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{names}</span>
                        {hasFlagged && <AlertTriangle className="h-3 w-3 shrink-0 text-destructive" />}
                      </div>
                      {conv.postTitle && (
                        <p className="mt-0.5 truncate text-xs text-primary/70">{conv.postTitle}</p>
                      )}
                      {lastMsg && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {lastMsg.senderName}: {lastMsg.text}
                        </p>
                      )}
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {conv.messages.length} message{conv.messages.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </button>
                )
              })
            )}
          </div>

          {/* Transcript panel */}
          <div className="flex flex-1 flex-col">
            {selected ? (
              <>
                <div className="border-b border-border px-5 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {selected.participants.map((p) => p.name).join(" & ")}
                  </p>
                  {selected.postTitle && (
                    <p className="text-xs text-muted-foreground">Re: {selected.postTitle}</p>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="flex flex-col gap-2.5">
                    {selected.messages.map((msg) => {
                      const flagged = isFlagged(msg.text)
                      return (
                        <div
                          key={msg.id}
                          className={cn(
                            "rounded-xl px-4 py-3",
                            flagged
                              ? "border border-destructive/30 bg-destructive/5"
                              : "bg-muted/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-foreground">
                              {msg.senderName}
                            </span>
                            <div className="flex items-center gap-2">
                              {flagged && (
                                <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">
                                  <AlertTriangle className="h-2.5 w-2.5" />
                                  Flagged
                                </span>
                              )}
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                              </span>
                            </div>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-foreground">{msg.text}</p>
                        </div>
                      )
                    })}
                    {selected.messages.length === 0 && (
                      <p className="py-12 text-center text-sm text-muted-foreground">No messages in this conversation.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                Select a conversation to view its transcript.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent reviews */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Recent Reviews</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {reviews.slice(0, 4).map((rev) => (
            <div key={rev.id} className="rounded-xl border border-border/60 bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{rev.reviewerName}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className={`h-2 w-2 rounded-full ${s <= rev.rating ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                reviewed {rev.targetName} - {rev.postTitle}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-foreground">{rev.text}</p>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, accent }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", accent ? "bg-destructive/10" : "bg-secondary/50")}>
          <Icon className={cn("h-4 w-4", accent ? "text-destructive" : "text-primary")} />
        </div>
        <div>
          <p className={cn("text-2xl font-bold", accent ? "text-destructive" : "text-foreground")}>{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
