import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Plus, PencilSimple, Trash, FloppyDisk } from "@phosphor-icons/react"

type Setting = {
  _id: Id<"site_settings">
  key: string
  value: string
  label: string
}

const DEFAULT_SETTINGS = [
  { key: "site_name", label: "Site Name", value: "Yawol Technologies" },
  { key: "contact_phone", label: "Contact Phone", value: "+91 98765 43210" },
  { key: "contact_email", label: "Contact Email", value: "contact@yawol.tech" },
  { key: "contact_address", label: "Office Address", value: "Mumbai, India" },
  { key: "footer_tagline", label: "Footer Tagline", value: "Engineering the future of connectivity." },
]

function SettingRow({ setting, onSave, onDelete }: {
  setting: Setting
  onSave: (value: string) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(setting.value)

  const handleSave = () => {
    onSave(value)
    setEditing(false)
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-background border border-border rounded-sm">
      <div className="flex-1">
        <p className="text-xs font-mono text-muted-foreground tracking-widest mb-1">
          {setting.key}
        </p>
        <p className="text-xs text-muted-foreground">{setting.label}</p>
      </div>
      <div className="flex-1">
        {editing ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="rounded-none h-8 text-sm"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <p className="text-sm">{setting.value}</p>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {editing ? (
          <button
            onClick={handleSave}
            className="p-1.5 rounded-sm text-green-500 hover:bg-green-500/10 transition-all"
          >
            <FloppyDisk size={16} />
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <PencilSimple size={16} />
          </button>
        )}
        <button
          onClick={onDelete}
          className="p-1.5 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  )
}

export function SiteSettingsPage() {
  const settings = useQuery(api.siteSettings.getAll)
  const upsert = useMutation(api.siteSettings.upsert)
  const remove = useMutation(api.siteSettings.remove)

  const [showNewForm, setShowNewForm] = useState(false)
  const [newKey, setNewKey] = useState("")
  const [newLabel, setNewLabel] = useState("")
  const [newValue, setNewValue] = useState("")

  const handleSeedDefaults = async () => {
    for (const s of DEFAULT_SETTINGS) {
      await upsert(s)
    }
  }

  const handleCreate = async () => {
    await upsert({ key: newKey, value: newValue, label: newLabel })
    setNewKey("")
    setNewLabel("")
    setNewValue("")
    setShowNewForm(false)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Site Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Global configuration values for the website
          </p>
        </div>
        <div className="flex gap-2">
          {settings?.length === 0 && (
            <Button variant="outline" onClick={handleSeedDefaults} className="rounded-none text-xs gap-2">
              Seed Defaults
            </Button>
          )}
          <Button onClick={() => setShowNewForm(true)} className="rounded-none gap-2">
            <Plus size={16} />
            Add Setting
          </Button>
        </div>
      </div>

      {showNewForm && (
        <div className="mb-6 p-5 border border-border bg-background rounded-sm space-y-3">
          <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            New Setting
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="key (e.g. contact_phone)" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="rounded-none font-mono text-sm" />
            <Input placeholder="Label (human-readable)" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} className="rounded-none" />
            <Input placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="rounded-none col-span-2" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setShowNewForm(false)} className="rounded-none">Cancel</Button>
            <Button onClick={handleCreate} className="rounded-none">Save</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {settings?.map((s) => (
          <SettingRow
            key={s._id}
            setting={s as Setting}
            onSave={(value) => upsert({ key: s.key, value, label: s.label })}
            onDelete={() => remove({ settingId: s._id })}
          />
        ))}
        {settings?.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-mono text-sm">
            NO_SETTINGS — Click "Seed Defaults" to pre-populate or "Add Setting".
          </div>
        )}
      </div>
    </div>
  )
}
