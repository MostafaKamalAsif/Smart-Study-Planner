import React from "react";
import { AlertCircle, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assignment } from "@/types";

interface AssignmentCardProps {
  assignment: Assignment;
  /** Subject name resolved from subjectId */
  subjectName?: string;

}

/** Formats "2024-03-20" → "Mar 20, 2024" */
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  subjectName,

}) => {
  const isOverdue = assignment.status === "Overdue";

  return (
    <Card
      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow cursor-pointer"
   
    >
      {/* Left: icon + title + subject */}
      <div className="flex items-center space-x-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isOverdue
              ? "bg-[var(--destructive)]/10 text-[var(--destructive)]"
              : "bg-[var(--primary)]/10 text-[var(--primary)]"
          }`}
        >
          {isOverdue ? <AlertCircle size={20} /> : <Calendar size={20} />}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{assignment.title}</p>
          {subjectName && (
            <p className="text-sm text-[var(--muted-foreground)] truncate">
              {subjectName}
            </p>
          )}
        </div>
      </div>

      {/* Right: deadline + status badge */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 flex-shrink-0">
        <p className="text-sm font-medium">{formatDate(assignment.deadline)}</p>
        <Badge variant={isOverdue ? "destructive" : "secondary"}>
          {assignment.status}
        </Badge>
      </div>
    </Card>
  );
};