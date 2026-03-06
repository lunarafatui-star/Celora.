"use client"

import { Nav } from "@/components/nav"
import { BountyForm } from "@/components/finder/bounty-form"

export default function FinderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="px-4 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-foreground">Trade Finder Service</h1>
          <p className="mt-2 text-muted-foreground">
            Post a bounty and let our expert finders locate the perfect account for you.
          </p>
        </div>
        <div className="mt-8">
          <BountyForm />
        </div>
      </main>
    </div>
  )
}
