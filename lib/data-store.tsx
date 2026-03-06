"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// --- Types ---

export interface ForumPost {
  id: string
  title: string
  game: string
  category: "buying" | "selling"
  description: string
  price: string
  authorId: string
  authorName: string
  authorRole: "buyer" | "seller" | "admin"
  createdAt: string
  comments: Comment[]
}

export interface Comment {
  id: string
  authorId: string
  authorName: string
  text: string
  createdAt: string
}

export interface Conversation {
  id: string
  participants: { id: string; name: string }[]
  postId?: string
  postTitle?: string
  messages: ChatMessage[]
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  text: string
  timestamp: string
}

export interface Review {
  id: string
  reviewerId: string
  reviewerName: string
  targetId: string
  targetName: string
  rating: number
  text: string
  postTitle: string
  createdAt: string
}

// --- Seed Data ---

const SEED_POSTS: ForumPost[] = [
  {
    id: "post-1",
    title: "Selling Valorant Immortal 3 Account",
    game: "Valorant",
    category: "selling",
    description: "Immortal 3 account with 50+ skins including Reaver Vandal and Champions bundle. All agents unlocked, clean match history. No bans or strikes.",
    price: "$120",
    authorId: "seed-user-1",
    authorName: "PhantomAce",
    authorRole: "seller",
    createdAt: "2026-03-04T10:30:00Z",
    comments: [
      { id: "c1", authorId: "seed-user-2", authorName: "NeonBlade", text: "What region is this account?", createdAt: "2026-03-04T11:00:00Z" },
      { id: "c2", authorId: "seed-user-1", authorName: "PhantomAce", text: "NA region, Los Angeles server.", createdAt: "2026-03-04T11:15:00Z" },
    ],
  },
  {
    id: "post-2",
    title: "Looking for Genshin Impact AR 55+ Account",
    game: "Genshin Impact",
    category: "buying",
    description: "Need an AR 55+ account with at least 3 limited 5-star characters. Prefer one with Raiden Shogun or Nahida. Budget flexible for the right account.",
    price: "$80-150",
    authorId: "seed-user-2",
    authorName: "NeonBlade",
    authorRole: "buyer",
    createdAt: "2026-03-04T09:00:00Z",
    comments: [
      { id: "c3", authorId: "seed-user-3", authorName: "StarfallGG", text: "I have an AR 58 with Raiden C2 and Nahida C0. DM me!", createdAt: "2026-03-04T09:45:00Z" },
    ],
  },
  {
    id: "post-3",
    title: "League of Legends Diamond Boost",
    game: "League of Legends",
    category: "selling",
    description: "Professional boosting service from any rank to Diamond. Currently Challenger player with 5 years of experience. Quick turnaround, VPN used for safety.",
    price: "$50-200",
    authorId: "seed-user-3",
    authorName: "StarfallGG",
    authorRole: "seller",
    createdAt: "2026-03-03T15:00:00Z",
    comments: [],
  },
  {
    id: "post-4",
    title: "CS2 Knife and Gloves Bundle",
    game: "CS2",
    category: "selling",
    description: "Selling Butterfly Knife Fade (Factory New) and Sport Gloves Hedge Maze. Both float values under 0.02. Screenshots available on request.",
    price: "$340",
    authorId: "seed-user-4",
    authorName: "VoidRunner",
    authorRole: "seller",
    createdAt: "2026-03-03T12:00:00Z",
    comments: [
      { id: "c4", authorId: "seed-user-2", authorName: "NeonBlade", text: "Can you share the float values?", createdAt: "2026-03-03T13:00:00Z" },
    ],
  },
  {
    id: "post-5",
    title: "Need Fortnite OG Account with Renegade Raider",
    game: "Fortnite",
    category: "buying",
    description: "Looking for a Fortnite account with Renegade Raider and other Season 1 exclusives. Must have email access. Will use middleman.",
    price: "$200+",
    authorId: "seed-user-5",
    authorName: "LunaStrike",
    authorRole: "buyer",
    createdAt: "2026-03-02T18:00:00Z",
    comments: [],
  },
]

const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    participants: [
      { id: "seed-user-1", name: "PhantomAce" },
      { id: "seed-user-2", name: "NeonBlade" },
    ],
    postId: "post-1",
    postTitle: "Selling Valorant Immortal 3 Account",
    messages: [
      { id: "m1", senderId: "seed-user-2", senderName: "NeonBlade", text: "Hey, I'm interested in the Valorant account. Is the price negotiable?", timestamp: "2026-03-04T12:00:00Z" },
      { id: "m2", senderId: "seed-user-1", senderName: "PhantomAce", text: "Sure, what were you thinking? I can do $110 if you're ready today.", timestamp: "2026-03-04T12:05:00Z" },
      { id: "m3", senderId: "seed-user-2", senderName: "NeonBlade", text: "That works for me. Can you send screenshots of the skins first?", timestamp: "2026-03-04T12:10:00Z" },
      { id: "m4", senderId: "seed-user-1", senderName: "PhantomAce", text: "Of course, give me a few minutes. I'll send the full inventory.", timestamp: "2026-03-04T12:12:00Z" },
    ],
  },
  {
    id: "conv-2",
    participants: [
      { id: "seed-user-3", name: "StarfallGG" },
      { id: "seed-user-2", name: "NeonBlade" },
    ],
    postId: "post-2",
    postTitle: "Looking for Genshin Impact AR 55+ Account",
    messages: [
      { id: "m5", senderId: "seed-user-3", senderName: "StarfallGG", text: "Hey I saw your post. I have an AR 58 account with Raiden C2, Nahida, Kazuha and Hu Tao.", timestamp: "2026-03-04T10:00:00Z" },
      { id: "m6", senderId: "seed-user-2", senderName: "NeonBlade", text: "That sounds amazing! How much are you looking for?", timestamp: "2026-03-04T10:05:00Z" },
      { id: "m7", senderId: "seed-user-3", senderName: "StarfallGG", text: "$140 for everything. It also has Welkin left for 20 days.", timestamp: "2026-03-04T10:08:00Z" },
    ],
  },
]

const SEED_REVIEWS: Review[] = [
  {
    id: "rev-1",
    reviewerId: "seed-user-2",
    reviewerName: "NeonBlade",
    targetId: "seed-user-4",
    targetName: "VoidRunner",
    rating: 5,
    text: "Smooth trade, item was exactly as described. Very responsive and quick delivery.",
    postTitle: "CS2 Knife and Gloves Bundle",
    createdAt: "2026-03-01T14:00:00Z",
  },
  {
    id: "rev-2",
    reviewerId: "seed-user-5",
    reviewerName: "LunaStrike",
    targetId: "seed-user-3",
    targetName: "StarfallGG",
    rating: 4,
    text: "Good service, boost was completed in 2 days. Minor delay at the start but overall solid.",
    postTitle: "League of Legends Diamond Boost",
    createdAt: "2026-02-28T10:00:00Z",
  },
]

// --- Context ---

interface DataStore {
  posts: ForumPost[]
  conversations: Conversation[]
  reviews: Review[]
  addPost: (post: ForumPost) => void
  addComment: (postId: string, comment: Comment) => void
  addConversation: (conv: Conversation) => void
  addMessage: (convId: string, msg: ChatMessage) => void
  addReview: (review: Review) => void
  getConversationsForUser: (userId: string) => Conversation[]
}

const DataContext = createContext<DataStore | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<ForumPost[]>(SEED_POSTS)
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS)
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS)

  function addPost(post: ForumPost) {
    setPosts((prev) => [post, ...prev])
  }

  function addComment(postId: string, comment: Comment) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
      )
    )
  }

  function addConversation(conv: Conversation) {
    setConversations((prev) => [conv, ...prev])
  }

  function addMessage(convId: string, msg: ChatMessage) {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId ? { ...c, messages: [...c.messages, msg] } : c
      )
    )
  }

  function addReview(review: Review) {
    setReviews((prev) => [review, ...prev])
  }

  function getConversationsForUser(userId: string) {
    return conversations.filter((c) =>
      c.participants.some((p) => p.id === userId)
    )
  }

  return (
    <DataContext.Provider
      value={{
        posts,
        conversations,
        reviews,
        addPost,
        addComment,
        addConversation,
        addMessage,
        addReview,
        getConversationsForUser,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error("useData must be used within DataProvider")
  return ctx
}
