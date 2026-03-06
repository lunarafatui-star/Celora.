"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

const steps = ["Game Selection", "Requirements", "Budget"]

const games = [
  "Valorant",
  "League of Legends",
  "Counter-Strike 2",
  "Fortnite",
  "Apex Legends",
  "Overwatch 2",
  "Dota 2",
  "Rocket League",
]

export function BountyForm() {
  const [step, setStep] = useState(0)
  const [game, setGame] = useState("")
  const [rank, setRank] = useState("")
  const [skins, setSkins] = useState("")
  const [characters, setCharacters] = useState("")
  const [notes, setNotes] = useState("")
  const [budget, setBudget] = useState("")
  const [finderFee, setFinderFee] = useState(10)

  const calculatedFee = budget ? (parseFloat(budget) * finderFee / 100).toFixed(2) : "0.00"
  const totalCost = budget ? (parseFloat(budget) + parseFloat(calculatedFee)).toFixed(2) : "0.00"

  const canProceed = () => {
    if (step === 0) return game.length > 0
    if (step === 1) return rank.length > 0
    return budget.length > 0 && parseFloat(budget) > 0
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  i < step
                    ? "bg-primary text-primary-foreground"
                    : i === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:block",
                  i <= step ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className="mx-4 hidden h-0.5 w-16 sm:block md:w-24">
                  <div
                    className={cn(
                      "h-full rounded-full transition-colors",
                      i < step ? "bg-primary" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-border bg-card p-6">
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Select Your Game</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose the game you want a Trade Finder to search for.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Game</Label>
              <Select value={game} onValueChange={setGame}>
                <SelectTrigger className="border-border bg-muted text-foreground focus:ring-primary">
                  <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-foreground">
                  {games.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Account Requirements</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Specify the details of the account you are looking for.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Desired Rank / Level</Label>
                <Input
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g., Immortal 2+, Diamond 1, Level 500"
                  className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Skins / Cosmetics</Label>
                <Textarea
                  value={skins}
                  onChange={(e) => setSkins(e.target.value)}
                  placeholder="e.g., Must have Reaver Vandal, at least 30+ skins"
                  className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Characters / Champions / Agents</Label>
                <Input
                  value={characters}
                  onChange={(e) => setCharacters(e.target.value)}
                  placeholder="e.g., All agents unlocked, specific characters"
                  className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Additional Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any other requirements or preferences..."
                  className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">Budget & Finder Fee</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {"Set your budget and the Finder's service fee percentage."}
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Max Budget (USD)</Label>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 250"
                  className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">{"Finder's Fee: "}{finderFee}%</Label>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={finderFee}
                  onChange={(e) => setFinderFee(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted p-4">
                <h4 className="text-sm font-semibold text-foreground">Cost Breakdown</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account Budget</span>
                    <span className="text-foreground">${budget || "0.00"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{"Finder's Fee ("}{finderFee}%)</span>
                    <span className="text-foreground">${calculatedFee}</span>
                  </div>
                  <div className="my-2 h-px bg-border" />
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${totalCost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className={cn(
              "rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              step === 0 && "invisible"
            )}
          >
            Back
          </button>

          {step < 2 ? (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground disabled:opacity-40 disabled:hover:bg-primary"
            >
              Continue
            </button>
          ) : (
            <button
              disabled={!canProceed()}
              className="group relative rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(255,193,217,0.4)] disabled:opacity-40"
            >
              <span className="relative z-10">Submit Bounty</span>
              <span className="absolute inset-0 rounded-lg bg-secondary/20 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
