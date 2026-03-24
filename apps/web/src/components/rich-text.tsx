import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface RichTextRendererProps {
  content: string // JSON string from Convex
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  let initialContent = {}
  try {
    initialContent = JSON.parse(content)
  } catch (e) {
    if (typeof content === "string" && content.trim() !== "") {
      initialContent = content
    }
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editable: false,
    editorProps: {
      attributes: {
        className: "prose yawol-prose max-w-none focus:outline-none",
      },
    },
  })

  return <EditorContent editor={editor} />
}
