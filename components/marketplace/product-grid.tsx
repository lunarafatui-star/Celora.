import { ScrollText, MessageSquare, ShieldCheck } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    step: "01",
    title: "Post or Browse",
    description: "Create a listing to sell, or browse the forum to find what you need. Filter by game, category, and price.",
    icon: ScrollText,
  },
  {
    step: "02",
    title: "Chat & Negotiate",
    description: "Message the buyer or seller directly. Discuss details, agree on terms, and finalize your deal in private chat.",
    icon: MessageSquare,
  },
  {
    step: "03",
    title: "Trade Safely",
    description: "All chats are monitored by admins for safety. Leave a review once your trade is complete to help the community.",
    icon: ShieldCheck,
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            How It Works
          </p>
          <h2 className="mt-3 font-serif text-3xl italic text-foreground md:text-4xl">
            Three Simple Steps
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-border/60 bg-card p-8"
            >
              <span className="font-serif text-5xl italic text-primary/20">
                {item.step}
              </span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-border/60 bg-secondary/30 p-10 text-center md:p-16">
          <h3 className="font-serif text-2xl italic text-foreground md:text-3xl">
            Ready to start trading?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Join Celora and connect with buyers and sellers across your favorite games. Safe, simple, and monitored.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              Create Account
            </Link>
            <Link
              href="/forum"
              className="rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Browse Forum
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
