"use client"

import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/data-store"

interface ConversationListProps {
  conversations: Conversation[]
  currentUserId: string
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, currentUserId, selectedId, onSelect }: ConversationListProps) {
  function getOtherName(conv: Conversation) {
    const other = conv.participants.find((p) => p.id !== currentUserId)
    return other?.name || "Unknown"
  }

  function getLastMessage(conv: Conversation) {
    if (conv.messages.length === 0) return "No messages yet"
    const last = conv.messages[conv.messages.length - 1]
    return last.text.length > 50 ? last.text.slice(0, 50) + "..." : last.text
  }

  function getLastTime(conv: Conversation) {
    if (conv.messages.length === 0) return ""
    const last = conv.messages[conv.messages.length - 1]
    const d = new Date(last.timestamp)
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <p className="text-sm text-muted-foreground">No conversations yet.</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Browse the forum and message a seller to start chatting.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {conversations.map((conv) => {
        const otherName = getOtherName(conv)
        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "flex items-start gap-3 border-b border-border/40 px-4 py-4 text-left transition-colors hover:bg-muted/50",
              selectedId === conv.id && "bg-secondary/50"
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary uppercase">
              {otherName.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground truncate">{otherName}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{getLastTime(conv)}</span>
              </div>
              {conv.postTitle && (
                <p className="mt-0.5 truncate text-xs text-primary/70">{conv.postTitle}</p>
              )}
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{getLastMessage(conv)}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
