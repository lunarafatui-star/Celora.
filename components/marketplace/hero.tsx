import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Left - Text content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Gaming Marketplace
            </p>
            <h1 className="mt-4 font-serif text-5xl italic leading-tight tracking-tight text-foreground md:text-7xl">
              Celora
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground lg:mx-0 lg:text-lg">
              Buy, sell, and trade gaming accounts, boosts, and in-game services.
              Chat directly with sellers, leave reviews, and browse listings
              in a safe, monitored marketplace.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/forum"
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                Browse Listings
              </Link>
              <Link
                href="/forum"
                className="rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                Post a Listing
              </Link>
            </div>
          </div>

          {/* Right - Hero image */}
          <div className="relative flex-1">
            <div className="absolute -inset-4 rounded-3xl bg-primary/8 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-2xl shadow-primary/10">
              <Image
                src="/images/hero.jpg"
                alt="Ethereal anime illustration with lavender tones and delicate lace patterns"
                width={640}
                height={360}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle decorative gradient */}
      <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
    </section>
  )
}
