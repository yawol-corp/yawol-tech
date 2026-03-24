import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { TipTapEditor } from "../components/TipTapEditor"
import { Plus, PencilSimple, Trash, Eye, EyeSlash } from "@phosphor-icons/react"

type Product = {
  _id: Id<"products">
  name: string
  description: string
  category: string
  price_inr: number
  images: Id<"_storage">[]
  specs: Record<string, string>
  active: boolean
  order: number
}

const CATEGORIES = [
  "ANTENNA_SYSTEMS",
  "CORE_NETWORK",
  "INFRASTRUCTURE",
  "POWER_SYSTEMS",
  "SURVEILLANCE",
  "TRANSPORT",
]

function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Product>
  onSave: (data: Omit<Product, "_id">) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial?.name ?? "")
  const [description, setDescription] = useState(initial?.description ?? "")
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0])
  const [priceRupees, setPriceRupees] = useState(
    initial?.price_inr ? String(initial.price_inr / 100) : ""
  )
  const [active, setActive] = useState(initial?.active ?? true)
  const [order, setOrder] = useState(String(initial?.order ?? 0))
  const [specsRaw, setSpecsRaw] = useState(
    initial?.specs ? Object.entries(initial.specs).map(([k, v]) => `${k}: ${v}`).join("\n") : ""
  )

  const parseSpecs = (): Record<string, string> => {
    const result: Record<string, string> = {}
    specsRaw.split("\n").forEach((line) => {
      const idx = line.indexOf(":")
      if (idx > 0) {
        result[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
      }
    })
    return result
  }

  const handleSave = () => {
    onSave({
      name,
      description,
      category,
      price_inr: Math.round(parseFloat(priceRupees) * 100),
      images: initial?.images ?? [],
      specs: parseSpecs(),
      active,
      order: parseInt(order, 10),
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Product Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Macro-Cell Transceiver Array"
            className="rounded-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-9 border border-input bg-background px-3 text-sm font-mono rounded-none focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Price (₹)
          </label>
          <Input
            type="number"
            value={priceRupees}
            onChange={(e) => setPriceRupees(e.target.value)}
            placeholder="e.g. 38500"
            className="rounded-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Display Order
          </label>
          <Input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="active" className="text-sm">
            Active (visible on storefront)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
          Description
        </label>
        <TipTapEditor
          content={description}
          onChange={setDescription}
          placeholder="Describe this product..."
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
          Technical Specs (one per line, KEY: VALUE)
        </label>
        <textarea
          value={specsRaw}
          onChange={(e) => setSpecsRaw(e.target.value)}
          rows={5}
          placeholder={"FREQ_BAND: Sub-6GHz\nBANDWIDTH: 400MHz Max\nPOWER_DRAW: 1200W"}
          className="w-full border border-input bg-background px-3 py-2 text-sm font-mono rounded-none focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </div>

      <div className="flex gap-2 justify-end pt-2 border-t border-border">
        <Button variant="ghost" onClick={onCancel} className="rounded-none">
          Cancel
        </Button>
        <Button onClick={handleSave} className="rounded-none">
          Save Product
        </Button>
      </div>
    </div>
  )
}

export function ProductsPage() {
  const products = useQuery(api.products.listAll)
  const create = useMutation(api.products.create)
  const update = useMutation(api.products.update)
  const remove = useMutation(api.products.remove)
  const toggleActive = useMutation(api.products.toggleActive)

  const [editing, setEditing] = useState<Id<"products"> | "new" | null>(null)

  const handleSave = async (data: Omit<Product, "_id">) => {
    if (editing === "new") {
      await create(data)
    } else if (editing) {
      await update({ productId: editing, ...data })
    }
    setEditing(null)
  }

  const handleDelete = async (id: Id<"products">) => {
    if (confirm("Delete this product?")) await remove({ productId: id })
  }

  const editingProduct = editing && editing !== "new"
    ? products?.find((p) => p._id === editing)
    : undefined

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {products?.length ?? 0} products —{" "}
            {products?.filter((p) => p.active).length ?? 0} active
          </p>
        </div>
        <Button onClick={() => setEditing("new")} className="rounded-none gap-2">
          <Plus size={16} />
          New Product
        </Button>
      </div>

      {editing !== null && (
        <div className="mb-8 p-6 border border-border bg-background rounded-sm">
          <h2 className="font-heading font-semibold mb-5 text-sm tracking-wide">
            {editing === "new" ? "Create Product" : "Edit Product"}
          </h2>
          <ProductForm
            initial={editingProduct}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <div className="space-y-2">
        {products?.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between p-4 bg-background border border-border rounded-sm"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{p.name}</p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                {p.category} &nbsp;·&nbsp; ₹{(p.price_inr / 100).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <button
                onClick={() => toggleActive({ productId: p._id, active: !p.active })}
                title={p.active ? "Deactivate" : "Activate"}
                className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                {p.active ? <Eye size={16} className="text-green-500" /> : <EyeSlash size={16} />}
              </button>
              <button
                onClick={() => setEditing(p._id)}
                className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <PencilSimple size={16} />
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="p-1.5 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        ))}
        {products?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            NO_PRODUCTS_FOUND — Click "New Product" to begin.
          </div>
        )}
      </div>
    </div>
  )
}
