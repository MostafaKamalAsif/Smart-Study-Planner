import React from "react";
import { MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Note } from "@/types";

interface NoteCardProps {
  note: Note;
  /** Subject name resolved from subjectId */
  subjectName?: string;
  onMenuClick?: (id: string) => void;
  onClick?: (id: string) => void;
}

/** Formats "2024-03-10" → "Mar 10, 2024" */
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  subjectName,
  onMenuClick,
  onClick,
}) => {
  return (
    <Card
      className="p-4 space-y-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(note.id)}
    >
      {/* Title + menu */}
      <div className="flex justify-between items-start">
        <h4 className="font-medium line-clamp-1">{note.title}</h4>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.(note.id);
          }}
        >
          <MoreVertical size={14} />
        </Button>
      </div>

      {/* Content preview */}
      <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
        {note.content}
      </p>

      {/* Footer: date + subject */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <span className="text-xs text-[var(--muted-foreground)]">
          {formatDate(note.updatedAt)}
        </span>
        {subjectName && (
          <span className="text-xs font-medium truncate ml-2">
            {subjectName}
          </span>
        )}
      </div>
    </Card>
  );
};