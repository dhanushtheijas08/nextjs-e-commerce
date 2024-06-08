"use client";

import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { useFormContext } from "react-hook-form";

const TextEditor = ({
  value,
  disabled,
}: {
  value: string;
  disabled: boolean;
}) => {
  const [prevValue, setPrevValue] = useState("");
  const { setValue, formState } = useFormContext();
  // console.log("Loading", formState.isLoading);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],
    onUpdate({ editor }) {
      const content = editor.getHTML();
      setValue("description", sanitizeHtml(content), { shouldValidate: true });
    },
    editorProps: {
      attributes: {
        class:
          "h-56 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: value,
  });

  return (
    <div className="flex flex-col">
      {editor && (
        <ToggleGroup
          onValueChange={(value) => {
            setPrevValue((prev) => (value === "" ? prev : value));

            if (value === "bullet-list" || prevValue === "bullet-list") {
              editor.chain().focus().toggleBulletList().run();
            } else if (
              value === "ordered-list" ||
              prevValue === "ordered-list"
            ) {
              editor.chain().focus().toggleOrderedList().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleMark(value || prevValue)
                .run();
            }
          }}
          type="single"
          variant="outline"
          className="justify-start mb-2"
        >
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strike" aria-label="Toggle Strike">
            <Strikethrough className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="bullet-list" aria-label="Toggle Bullet List">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="ordered-list"
            aria-label="Toggle Ordered List List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      )}
      <EditorContent editor={editor} disabled={true} />
    </div>
  );
};

export default TextEditor;
