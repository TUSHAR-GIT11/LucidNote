"use client"

import {
  Undo2, Redo2, Heading2, List, Quote, Code2, Minus,
  Bold, Italic, Strikethrough, Underline, Highlighter,
  Superscript, Subscript, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Save
} from "lucide-react"
import { Editor } from "@tiptap/react"

interface ToolbarProps {
  editor: Editor | null
  onSave?: () => void
  saving?: boolean
}

export default function Toolbar({ editor, onSave, saving }: ToolbarProps) {

  const btn = (active: boolean) => `
    w-10 h-10 rounded-xl border border-zinc-800
    flex items-center justify-center text-zinc-300
    transition hover:bg-zinc-800
    ${active ? "bg-zinc-700 text-white border-zinc-600" : "bg-zinc-950"}
  `

  if (!editor) return null

  return (
    <div className="h-[60px] border-b border-zinc-800 bg-black flex items-center justify-between px-4">
      <div className="flex items-center gap-1 flex-wrap">

        {/* Undo / Redo */}
        {/* Undo / Redo */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().undo().run() }}
  className={btn(false)}>
  <Undo2 size={16} />
</button>

<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().redo().run() }}
  className={btn(false)}>
  <Redo2 size={16} />
</button>

{/* Heading */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run() }}
  className={btn(editor.isActive("heading", { level: 2 }))}>
  <Heading2 size={16} />
</button>

{/* List */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run() }}
  className={btn(editor.isActive("bulletList"))}>
  <List size={16} />
</button>

{/* Blockquote */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run() }}
  className={btn(editor.isActive("blockquote"))}>
  <Quote size={16} />
</button>

{/* Code */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleCode().run() }}
  className={btn(editor.isActive("code"))}>
  <Code2 size={16} />
</button>

{/* Divider */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setHorizontalRule().run() }}
  className={btn(false)}>
  <Minus size={16} />
</button>

{/* Bold */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run() }}
  className={btn(editor.isActive("bold"))}>
  <Bold size={16} />
</button>

{/* Italic */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run() }}
  className={btn(editor.isActive("italic"))}>
  <Italic size={16} />
</button>

{/* Strike */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run() }}
  className={btn(editor.isActive("strike"))}>
  <Strikethrough size={16} />
</button>

{/* Underline */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run() }}
  className={btn(editor.isActive("underline"))}>
  <Underline size={16} />
</button>

{/* Highlight */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleHighlight().run() }}
  className={btn(editor.isActive("highlight"))}>
  <Highlighter size={16} />
</button>

{/* Superscript */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleSuperscript().run() }}
  className={btn(editor.isActive("superscript"))}>
  <Superscript size={16} />
</button>

{/* Subscript */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleSubscript().run() }}
  className={btn(editor.isActive("subscript"))}>
  <Subscript size={16} />
</button>

{/* Align Left */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("left").run() }}
  className={btn(editor.isActive({ textAlign: "left" }))}>
  <AlignLeft size={16} />
</button>

{/* Align Center */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("center").run() }}
  className={btn(editor.isActive({ textAlign: "center" }))}>
  <AlignCenter size={16} />
</button>

{/* Align Right */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("right").run() }}
  className={btn(editor.isActive({ textAlign: "right" }))}>
  <AlignRight size={16} />
</button>

{/* Align Justify */}
<button
  onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("justify").run() }}
  className={btn(editor.isActive({ textAlign: "justify" }))}>
  <AlignJustify size={16} />
</button>


      </div>

      {/* Save */}
      <button
        onClick={onSave}
        disabled={saving}
        className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium flex items-center gap-2 text-sm"
      >
        <Save size={16} />
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}
