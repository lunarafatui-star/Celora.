"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "buyer" | "seller" | "admin"

export interface User {
  id: string
  username: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  register: (username: string, password: string, role: UserRole) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const ADMIN_ACCOUNT = { id: "admin-001", username: "admin", password: "admin", role: "admin" as UserRole }

function getStoredUsers(): Array<{ id: string; username: string; password: string; role: UserRole }> {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("celora-users") || "[]")
  } catch {
    return []
  }
}

function storeUsers(users: Array<{ id: string; username: string; password: string; role: UserRole }>) {
  localStorage.setItem("celora-users", JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("celora-session")
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  function login(username: string, password: string): boolean {
    if (username === ADMIN_ACCOUNT.username && password === ADMIN_ACCOUNT.password) {
      const u: User = { id: ADMIN_ACCOUNT.id, username: ADMIN_ACCOUNT.username, role: ADMIN_ACCOUNT.role }
      setUser(u)
      localStorage.setItem("celora-session", JSON.stringify(u))
      return true
    }
    const users = getStoredUsers()
    const found = users.find((u) => u.username === username && u.password === password)
    if (found) {
      const u: User = { id: found.id, username: found.username, role: found.role }
      setUser(u)
      localStorage.setItem("celora-session", JSON.stringify(u))
      return true
    }
    return false
  }

  function register(username: string, password: string, role: UserRole): boolean {
    if (username === ADMIN_ACCOUNT.username) return false
    const users = getStoredUsers()
    if (users.some((u) => u.username === username)) return false
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      password,
      role,
    }
    storeUsers([...users, newUser])
    const u: User = { id: newUser.id, username: newUser.username, role: newUser.role }
    setUser(u)
    localStorage.setItem("celora-session", JSON.stringify(u))
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem("celora-session")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
