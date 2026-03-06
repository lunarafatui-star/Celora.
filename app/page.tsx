import { Nav } from "@/components/nav"
import { Hero } from "@/components/marketplace/hero"
import { Categories } from "@/components/marketplace/categories"
import { HowItWorks } from "@/components/marketplace/product-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Categories />
        <HowItWorks />
      </main>
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="font-serif text-lg italic text-primary">Celora</p>
          <p className="mt-2 text-xs text-muted-foreground">
            A gaming marketplace for buyers and sellers. All chats monitored for safety.
          </p>
        </div>
      </footer>
    </div>
  )
}
