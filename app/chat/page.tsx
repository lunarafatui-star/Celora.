"use client"

import { Nav } from "@/components/nav"
import { ConversationList } from "@/components/chat/conversation-list"
import { ChatWindow } from "@/components/chat/chat-window"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-store"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { MessageSquare } from "lucide-react"

function ChatContent() {
  const { user } = useAuth()
  const { getConversationsForUser } = useData()
  const searchParams = useSearchParams()
  const [selectedConv, setSelectedConv] = useState<string | null>(null)

  const convParam = searchParams.get("conv")

  useEffect(() => {
    if (convParam) {
      setSelectedConv(convParam)
    }
  }, [convParam])

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <MessageSquare className="h-10 w-10 text-muted-foreground/40" />
        <p className="mt-4 text-sm text-muted-foreground">Sign in to view your messages.</p>
        <Link href="/login" className="mt-3 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">
          Sign In
        </Link>
      </div>
    )
  }

  const conversations = getConversationsForUser(user.id)

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      <h1 className="font-serif text-3xl italic text-foreground">Messages</h1>
      <p className="mt-1 text-sm text-muted-foreground">Your conversations with buyers and sellers</p>

      <div className="mt-6 flex overflow-hidden rounded-2xl border border-border bg-card" style={{ height: "calc(100vh - 220px)" }}>
        {/* Sidebar */}
        <div className="w-80 shrink-0 overflow-y-auto border-r border-border">
          <div className="sticky top-0 border-b border-border bg-card px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Conversations ({conversations.length})
            </p>
          </div>
          <ConversationList
            conversations={conversations}
            currentUserId={user.id}
            selectedId={selectedConv}
            onSelect={setSelectedConv}
          />
        </div>

        {/* Chat area */}
        {selectedConv ? (
          <ChatWindow conversationId={selectedConv} />
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">Loading...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  )
}
