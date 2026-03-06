"use client"

import { Nav } from "@/components/nav"
import { RequestQueue } from "@/components/artist/request-queue"

export default function ArtistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <RequestQueue />
    </div>
  )
}
