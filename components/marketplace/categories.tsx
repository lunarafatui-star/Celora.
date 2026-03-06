import { Gamepad2, Zap, Gem, Wrench } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Accounts",
    description: "High-level accounts across popular games, fully verified and secure.",
    icon: Gamepad2,
  },
  {
    name: "Boosting",
    description: "Rank boosts, leveling services, and competitive carries by top players.",
    icon: Zap,
  },
  {
    name: "Items & Skins",
    description: "Rare skins, in-game items, cosmetics, and limited-edition collectibles.",
    icon: Gem,
  },
  {
    name: "Services",
    description: "Coaching, account recovery, custom setups, and game-related services.",
    icon: Wrench,
  },
]

export function Categories() {
  return (
    <section className="bg-card/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Categories
          </p>
          <h2 className="mt-3 font-serif text-3xl italic text-foreground md:text-4xl">
            What You Can Trade
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              href="/forum"
              key={cat.name}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
