import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Clock, DollarSign, Package, User } from "lucide-react"

export function EscrowPanel() {
  return (
    <aside className="flex h-[calc(100vh-4rem)] w-80 shrink-0 flex-col border-l border-border bg-card">
      <div className="border-b border-border p-4">
        <h2 className="text-sm font-bold text-foreground">Escrow Status</h2>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4FFFB0]/15">
            <ShieldCheck className="h-4 w-4 text-[#4FFFB0]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#4FFFB0]">Funds Secured</p>
            <p className="text-xs text-muted-foreground">Escrow active since 2:30 PM</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border bg-muted p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Amount Held</span>
            <span className="text-sm font-bold text-foreground">$249.99</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Awaiting buyer confirmation</p>
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-sm font-bold text-foreground">Trade Details</h3>

        <div className="mt-4 space-y-3">
          <DetailRow icon={Package} label="Item" value="Valorant Immortal 3 Account" />
          <DetailRow icon={DollarSign} label="Price" value="$249.99" />
          <DetailRow icon={User} label="Buyer" value="Buyer_Alex" />
          <DetailRow icon={User} label="Seller" value="Seller_Nova" />
          <DetailRow icon={Clock} label="Trade Started" value="Today, 2:30 PM" />
        </div>

        <Separator className="my-4" />

        <h3 className="text-sm font-bold text-foreground">Trade Timeline</h3>
        <div className="mt-3 space-y-3">
          {[
            { label: "Escrow funded", time: "2:30 PM", done: true },
            { label: "Account details shared", time: "2:32 PM", done: true },
            { label: "Finder verified", time: "2:33 PM", done: true },
            { label: "Buyer confirms receipt", time: "Pending", done: false },
            { label: "Funds released", time: "--", done: false },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                  step.done ? "bg-[#4FFFB0]" : "bg-muted-foreground/30"
                }`}
              />
              <div>
                <p className={`text-sm ${step.done ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-2">
          <button className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground">
            Confirm Receipt
          </button>
          <button className="w-full rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            Open Dispute
          </button>
        </div>
      </div>
    </aside>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
