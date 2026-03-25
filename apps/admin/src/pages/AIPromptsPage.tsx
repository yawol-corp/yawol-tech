import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Plus, PencilSimple, Trash, ToggleLeft, ToggleRight } from "@phosphor-icons/react"

const MODELS = ["gpt-4o", "gpt-4o-mini", "gemini-2.0-flash", "gemini-2.5-pro", "claude-3-5-sonnet"]

type Prompt = {
  _id: Id<"ai_prompts">
  name: string
  system_message: string
  temperature: number
  model: string
  active: boolean
  tags: string[]
}

function PromptForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Prompt>
  onSave: (data: Omit<Prompt, "_id">) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial?.name ?? "")
  const [systemMessage, setSystemMessage] = useState(initial?.system_message ?? "")
  const [temperature, setTemperature] = useState(String(initial?.temperature ?? 0.7))
  const [model, setModel] = useState(initial?.model ?? MODELS[0])
  const [active, setActive] = useState(initial?.active ?? true)
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "")

  const handleSave = () => {
    onSave({
      name,
      system_message: systemMessage,
      temperature: parseFloat(temperature),
      model,
      active,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Identifier Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. site_assistant"
            className="rounded-none font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full h-9 border border-input bg-background px-3 text-sm font-mono rounded-none focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Temperature: {temperature}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[0.6rem] font-mono text-muted-foreground mt-1">
            <span>0.0 (precise)</span>
            <span>1.0 (balanced)</span>
            <span>2.0 (creative)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="prompt-active"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="prompt-active" className="text-sm">
            Active
          </label>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
            Tags (comma separated)
          </label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="chat, assistant, support"
            className="rounded-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-widest">
          System Message
        </label>
        <textarea
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
          rows={8}
          placeholder="You are the Yawol Technologies assistant..."
          className="w-full border border-input bg-background px-3 py-2 text-sm font-mono rounded-none focus:outline-none focus:ring-1 focus:ring-ring resize-y"
        />
      </div>

      <div className="flex gap-2 justify-end pt-2 border-t border-border">
        <Button variant="ghost" onClick={onCancel} className="rounded-none">
          Cancel
        </Button>
        <Button onClick={handleSave} className="rounded-none">
          Save Prompt
        </Button>
      </div>
    </div>
  )
}

export function AIPromptsPage() {
  const prompts = useQuery(api.aiPrompts.listAll)
  const create = useMutation(api.aiPrompts.create)
  const update = useMutation(api.aiPrompts.update)
  const remove = useMutation(api.aiPrompts.remove)
  const toggleActive = useMutation(api.aiPrompts.toggleActive)

  const [editing, setEditing] = useState<Id<"ai_prompts"> | "new" | null>(null)

  const handleSave = async (data: Omit<Prompt, "_id">) => {
    if (editing === "new") {
      await create(data)
    } else if (editing) {
      await update({ promptId: editing, ...data })
    }
    setEditing(null)
  }

  const handleDelete = async (id: Id<"ai_prompts">) => {
    if (confirm("Delete this prompt?")) await remove({ promptId: id })
  }

  const editingPrompt = editing && editing !== "new"
    ? prompts?.find((p) => p._id === editing)
    : undefined

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">AI Prompts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Control system messages, models, and temperature for AI features
          </p>
        </div>
        <Button onClick={() => setEditing("new")} className="rounded-none gap-2">
          <Plus size={16} />
          New Prompt
        </Button>
      </div>

      {editing !== null && (
        <div className="mb-8 p-6 border border-border bg-background rounded-sm">
          <h2 className="font-heading font-semibold mb-5 text-sm tracking-wide">
            {editing === "new" ? "New Prompt" : "Edit Prompt"}
          </h2>
          <PromptForm
            initial={editingPrompt}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <div className="space-y-2">
        {prompts?.map((p) => (
          <div key={p._id} className="flex items-center justify-between p-4 bg-background border border-border rounded-sm">
            <div className="flex-1 min-w-0">
              <p className="font-mono font-medium">{p.name}</p>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                {p.model} &nbsp;·&nbsp; temp: {p.temperature}
              </p>
              <p className="text-xs text-muted-foreground mt-1 truncate max-w-xl">
                {p.system_message.slice(0, 100)}...
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <button
                onClick={() => toggleActive({ promptId: p._id, active: !p.active })}
                className="p-1.5 rounded-sm text-muted-foreground hover:text-foreground transition-all"
              >
                {p.active ? (
                  <ToggleRight size={20} className="text-green-500" />
                ) : (
                  <ToggleLeft size={20} />
                )}
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
        {prompts?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">
            NO_PROMPTS_FOUND — Click "New Prompt" to begin.
          </div>
        )}
      </div>
    </div>
  )
}
