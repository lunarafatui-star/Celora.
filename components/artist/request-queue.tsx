"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ImagePlus, Upload, Eye, Clock, CheckCircle2, Bell } from "lucide-react"

interface ArtRequest {
  id: number
  client: string
  game: string
  character: string
  style: string
  status: "pending" | "in-progress" | "review" | "completed"
  screenshots: string[]
  hasNewScreenshot: boolean
  deadline: string
  notes: string
}

const requests: ArtRequest[] = [
  {
    id: 1,
    client: "Seller_Nova",
    game: "Valorant",
    character: "Jett",
    style: "Anime-inspired splash art",
    status: "in-progress",
    screenshots: [
      "/placeholder.svg?height=120&width=160",
      "/placeholder.svg?height=120&width=160",
    ],
    hasNewScreenshot: true,
    deadline: "Mar 8, 2026",
    notes: "Would like glowing knives and wind effects. Blue/teal color scheme preferred.",
  },
  {
    id: 2,
    client: "RareSkins",
    game: "League of Legends",
    character: "Ahri",
    style: "Semi-realistic portrait",
    status: "pending",
    screenshots: ["/placeholder.svg?height=120&width=160"],
    hasNewScreenshot: false,
    deadline: "Mar 12, 2026",
    notes: "K/DA skin version. Purple and neon accents.",
  },
  {
    id: 3,
    client: "EliteTrader",
    game: "Overwatch 2",
    character: "Kiriko",
    style: "Chibi / cute style",
    status: "review",
    screenshots: [
      "/placeholder.svg?height=120&width=160",
      "/placeholder.svg?height=120&width=160",
      "/placeholder.svg?height=120&width=160",
    ],
    hasNewScreenshot: false,
    deadline: "Mar 6, 2026",
    notes: "Fox spirit theme. Pastel palette with gold accents.",
  },
  {
    id: 4,
    client: "TopTierGaming",
    game: "Apex Legends",
    character: "Wraith",
    style: "Dark / moody illustration",
    status: "completed",
    screenshots: ["/placeholder.svg?height=120&width=160"],
    hasNewScreenshot: false,
    deadline: "Mar 3, 2026",
    notes: "Void Runner skin. Portal effects with blue and purple tones.",
  },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-muted-foreground/20 text-muted-foreground" },
  "in-progress": { label: "In Progress", color: "bg-primary/20 text-primary" },
  review: { label: "Under Review", color: "bg-secondary/20 text-secondary" },
  completed: { label: "Completed", color: "bg-[#4FFFB0]/15 text-[#4FFFB0]" },
}

export function RequestQueue() {
  const [selectedId, setSelectedId] = useState(1)
  const selected = requests.find((r) => r.id === selectedId)!

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Queue sidebar */}
      <div className="w-80 shrink-0 border-r border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="text-sm font-bold text-foreground">Illustration Queue</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{requests.length} active requests</p>
        </div>
        <ScrollArea className="h-[calc(100%-56px)]">
          <div className="p-2">
            {requests.map((req) => {
              const status = statusConfig[req.status]
              return (
                <button
                  key={req.id}
                  onClick={() => setSelectedId(req.id)}
                  className={cn(
                    "mb-1 w-full rounded-lg p-3 text-left transition-colors",
                    selectedId === req.id
                      ? "bg-primary/10 border border-primary/30"
                      : "border border-transparent hover:bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{req.character}</span>
                    <div className="flex items-center gap-1">
                      {req.hasNewScreenshot && (
                        <div className="relative">
                          <Bell className="h-3.5 w-3.5 text-secondary" />
                          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-secondary" />
                        </div>
                      )}
                      <Badge className={cn("text-[10px]", status.color)}>{status.label}</Badge>
                    </div>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{req.game} - {req.client}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{req.style}</p>
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-auto">
        {selected && (
          <>
            <div className="border-b border-border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {selected.character} - {selected.style}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selected.game} | Client: {selected.client} | Due: {selected.deadline}
                  </p>
                </div>
                <Badge className={cn(statusConfig[selected.status].color)}>
                  {statusConfig[selected.status].label}
                </Badge>
              </div>
            </div>

            <div className="flex-1 p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Screenshots from seller */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground">Character Screenshots</h3>
                    {selected.hasNewScreenshot && (
                      <span className="flex items-center gap-1 rounded-md bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary">
                        <Bell className="h-3 w-3" />
                        New upload
                      </span>
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {selected.screenshots.map((src, i) => (
                      <div
                        key={i}
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted"
                      >
                        <img
                          src={src}
                          alt={`Screenshot ${i + 1}`}
                          className="h-full w-full object-cover"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
                          <Eye className="h-5 w-5 text-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-5" />

                  <h3 className="text-sm font-bold text-foreground">Style Preferences</h3>
                  <p className="mt-2 rounded-lg border border-border bg-muted p-3 text-sm text-foreground">
                    {selected.notes}
                  </p>
                </div>

                {/* Upload / Submit area */}
                <div>
                  <h3 className="text-sm font-bold text-foreground">Submit Final Art</h3>

                  <div className="mt-3 flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 transition-colors hover:border-primary hover:bg-primary/5">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium text-foreground">
                      Drop your artwork here
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, PSD up to 50MB</p>
                  </div>

                  <Separator className="my-5" />

                  <h3 className="text-sm font-bold text-foreground">Preview Card</h3>
                  <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
                    <div className="aspect-[16/10] bg-muted flex items-center justify-center">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-foreground">{selected.character}</p>
                      <p className="text-xs text-muted-foreground">{selected.style}</p>
                    </div>
                  </div>

                  <button className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground">
                    Submit Final Art
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
