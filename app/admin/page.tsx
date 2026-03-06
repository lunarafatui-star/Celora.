"use client"

import { Nav } from "@/components/nav"
import { AdminDashboard } from "@/components/admin/live-feed"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <AdminDashboard />
      </main>
    </div>
  )
}
