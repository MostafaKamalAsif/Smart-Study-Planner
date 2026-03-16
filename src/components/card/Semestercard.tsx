import React from "react";
import { Calendar, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Semester } from "@/types";
import Link from "next/link";

interface SemesterCardProps {
  /** Full semester object from  types */
  semester: Semester;
  /** Called when "View Subjects" button is clicked */
  onViewSubjects?: (id: string) => void;
  /** Called when the card itself is clicked */
  onClick?: (id: string) => void;
}

/** Formats "2024-01-15" → "Jan 15, 2024" */
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** A semester is "active" if today falls between its start and end dates */
const isActiveSemester = (startDate: string, endDate: string) => {
  const now = new Date();
  return new Date(startDate) <= now && now <= new Date(endDate);
};

export const SemesterCard: React.FC<SemesterCardProps> = ({
  semester,
  onViewSubjects,
  onClick,
}) => {
  const active = isActiveSemester(semester.startDate, semester.endDate);

  return (
    <Card
      className="p-6 space-y-4 hover:border-[var(--primary)]/50 transition-all group cursor-pointer"
      onClick={() => onClick?.(semester.id)}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1 min-w-0">
          <h3 className="text-xl font-bold group-hover:text-[var(--primary)] transition-colors truncate">
            {semester.name}
          </h3>
          {active && (
            <p className="text-xs font-medium text-[var(--primary)]">
              ● Active
            </p>
          )}
        </div>
        <Badge variant="secondary" className="flex-shrink-0">
          {semester.subjectCount} Subjects
        </Badge>
      </div>

      {/* Meta */}
      <div className="space-y-3 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center text-sm text-[var(--muted-foreground)]">
          <Calendar className="mr-2 flex-shrink-0" size={14} />
          <span className="truncate">
            {formatDate(semester.startDate)} — {formatDate(semester.endDate)}
          </span>
        </div>
        <div className="flex items-center text-sm text-[var(--muted-foreground)]">
          <BookOpen className="mr-2 flex-shrink-0" size={14} />
          <span>{semester.subjectCount} subjects enrolled</span>
        </div>
      </div>

      {/* Action */}
      <Link href={"/subjects"}>
      <Button
        variant="outline"
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onViewSubjects?.(semester.id);
        }}
      >
        View Subjects
      </Button>
      </Link>
    </Card>
  );
};