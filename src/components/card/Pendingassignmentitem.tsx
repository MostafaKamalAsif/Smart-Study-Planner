import React from "react";
import { ChevronRight } from "lucide-react";
import { Assignment } from "@/types";

interface PendingAssignmentItemProps {
  assignment: Assignment;
  
}

export const PendingAssignmentItem: React.FC<PendingAssignmentItemProps> = ({
  assignment,
 
}) => {
  return (
    <div
      className="flex items-center space-x-3 p-2 hover:bg-[var(--accent)] rounded-lg transition-colors cursor-pointer group"
      
    >
      <div className="w-2 h-2 rounded-full bg-[var(--primary)] flex-shrink-0" />
      <span className="text-sm font-medium flex-1 group-hover:text-[var(--primary)] transition-colors truncate">
        {assignment.title}
      </span>
      <ChevronRight size={14} className="text-[var(--muted-foreground)] flex-shrink-0" />
    </div>
  );
};