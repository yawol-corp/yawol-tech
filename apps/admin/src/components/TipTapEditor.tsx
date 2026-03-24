import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  ListBullets,
  ListNumbers,
  TextH,
  Quotes,
  LinkSimple,
  Minus,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  HighlighterCircle,
  ArrowCounterClockwise,
  ArrowClockwise,
} from "@phosphor-icons/react"
import { cn } from "@workspace/ui/lib/utils"

interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}

function ToolbarButton({ onClick, active, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "p-1.5 rounded-sm text-sm transition-all",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const url = window.prompt("URL:")
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex flex-wrap gap-0.5 p-2 border-b border-border bg-muted/40">
      {/* Text style */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
        <TextB size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
        <TextItalic size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
        <TextUnderline size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
        <TextStrikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight">
        <HighlighterCircle size={16} />
      </ToolbarButton>

      <div className="w-px bg-border mx-0.5 self-stretch" />

      {/* Headings */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
        <TextH size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
        <span className="text-[0.65rem] font-bold">H2</span>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
        <span className="text-[0.65rem] font-bold">H3</span>
      </ToolbarButton>

      <div className="w-px bg-border mx-0.5 self-stretch" />

      {/* Lists */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
        <ListBullets size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List">
        <ListNumbers size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
        <Quotes size={16} />
      </ToolbarButton>

      <div className="w-px bg-border mx-0.5 self-stretch" />

      {/* Align */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
        <TextAlignLeft size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
        <TextAlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
        <TextAlignRight size={16} />
      </ToolbarButton>

      <div className="w-px bg-border mx-0.5 self-stretch" />

      {/* Extras */}
      <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Insert Link">
        <LinkSimple size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
        <Minus size={16} />
      </ToolbarButton>

      <div className="w-px bg-border mx-0.5 self-stretch" />

      {/* History */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
        <ArrowCounterClockwise size={16} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
        <ArrowClockwise size={16} />
      </ToolbarButton>
    </div>
  )
}

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function TipTapEditor({ content, onChange, placeholder = "Start writing..." }: TipTapEditorProps) {
  const initialContent = (() => {
    if (!content) return ""
    try {
      return JSON.parse(content)
    } catch {
      return content // treat as HTML or plain text
    }
  })()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()))
    },
    editorProps: {
      attributes: { class: "tiptap" },
    },
  })

  if (!editor) return null

  return (
    <div className="tiptap-container border border-border rounded-none bg-background transition-colors">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
