"use client"

import {
  Undo2,
  Redo2,
  Heading1,
  List,
  Quote,
  Code2,
  Minus,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Highlighter,
  Link,
  Superscript,
  Subscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Save
} from "lucide-react"

export default function Toolbar() {

  const buttonClass = `
    w-10
    h-10
    rounded-xl
    border
    border-zinc-800
    bg-zinc-950
    hover:bg-zinc-900
    flex
    items-center
    justify-center
    text-zinc-300
    transition
  `

  return (
    <div
      className="
      h-[60px]
      border-b
      border-zinc-800
      bg-black
      flex
      items-center
      justify-between
      px-4
    "
    >
      <div className="flex items-center gap-2">

        <button className={buttonClass}>
          <Undo2 size={18} />
        </button>

        <button className={buttonClass}>
          <Redo2 size={18} />
        </button>

        <button className={buttonClass}>
          <Heading1 size={18} />
        </button>

        <button className={buttonClass}>
          <List size={18} />
        </button>

        <button className={buttonClass}>
          <Quote size={18} />
        </button>

        <button className={buttonClass}>
          <Code2 size={18} />
        </button>

        <button className={buttonClass}>
          <Minus size={18} />
        </button>

        <button className={buttonClass}>
          <Bold size={18} />
        </button>

        <button className={buttonClass}>
          <Italic size={18} />
        </button>

        <button className={buttonClass}>
          <Strikethrough size={18} />
        </button>

        <button className={buttonClass}>
          <Underline size={18} />
        </button>

        <button className={buttonClass}>
          <Highlighter size={18} />
        </button>

        <button className={buttonClass}>
          <Link size={18} />
        </button>

        <button className={buttonClass}>
          <Superscript size={18} />
        </button>

        <button className={buttonClass}>
          <Subscript size={18} />
        </button>

        <button className={buttonClass}>
          <AlignLeft size={18} />
        </button>

        <button className={buttonClass}>
          <AlignCenter size={18} />
        </button>

        <button className={buttonClass}>
          <AlignRight size={18} />
        </button>

        <button className={buttonClass}>
          <AlignJustify size={18} />
        </button>

      </div>

      <button
        className="
        h-10
        px-4
        rounded-xl
        bg-blue-600
        hover:bg-blue-500
        text-white
        font-medium
        flex
        items-center
        gap-2
      "
      >
        <Save size={16} />
        Save
      </button>
    </div>
  )
}