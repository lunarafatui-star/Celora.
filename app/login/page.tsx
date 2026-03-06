"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/lib/auth-context"
import Link from "next/link"

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("buyer")
  const [error, setError] = useState("")
  const { login, register } = useAuth()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.")
      return
    }

    if (tab === "login") {
      const ok = login(username.trim(), password)
      if (!ok) {
        setError("Invalid username or password.")
        return
      }
    } else {
      if (password.length < 3) {
        setError("Password must be at least 3 characters.")
        return
      }
      const ok = register(username.trim(), password, role)
      if (!ok) {
        setError("Username already taken.")
        return
      }
    }
    router.push("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/">
            <span className="font-serif text-4xl italic tracking-wide text-primary">
              Celora
            </span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">Gaming marketplace</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Tabs */}
          <div className="mb-6 flex rounded-xl bg-muted p-1">
            <button
              type="button"
              onClick={() => { setTab("login"); setError("") }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                tab === "login"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab("register"); setError("") }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                tab === "register"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-foreground">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your password"
              />
            </div>

            {tab === "register" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  I want to
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      role === "buyer"
                        ? "border-primary bg-secondary text-secondary-foreground"
                        : "border-border text-muted-foreground hover:border-accent"
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("seller")}
                    className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      role === "seller"
                        ? "border-primary bg-secondary text-secondary-foreground"
                        : "border-border text-muted-foreground hover:border-accent"
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
