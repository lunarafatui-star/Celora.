"use client"

import { useState, useRef, useEffect } from "react"
import { useData } from "@/lib/data-store"
import { useAuth } from "@/lib/auth-context"
import { Send, ShieldCheck } from "lucide-react"

interface ChatWindowProps {
  conversationId: string
}

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const { conversations, addMessage } = useData()
  const { user } = useAuth()
  const [text, setText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const conv = conversations.find((c) => c.id === conversationId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conv?.messages.length])

  if (!conv || !user) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Select a conversation to start chatting.
      </div>
    )
  }

  const otherName = conv.participants.find((p) => p.id !== user.id)?.name || "Unknown"

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || !user) return
    addMessage(conversationId, {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.username,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    })
    setText("")
  }

  function formatTime(iso: string) {
    const d = new Date(iso)
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary uppercase">
            {otherName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{otherName}</p>
            {conv.postTitle && (
              <p className="text-xs text-muted-foreground truncate max-w-xs">
                Re: {conv.postTitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
          <ShieldCheck className="h-3 w-3" />
          Monitored
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-3">
          {conv.messages.map((msg) => {
            const isMine = msg.senderId === user.id
            return (
              <div
                key={msg.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    isMine
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {!isMine && (
                    <p className="mb-0.5 text-[10px] font-medium opacity-70">
                      {msg.senderName}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`mt-1 text-[10px] ${isMine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
          {conv.messages.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No messages yet. Say hello!
            </p>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex items-center gap-3 border-t border-border px-5 py-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
