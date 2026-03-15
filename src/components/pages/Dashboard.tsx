"use client";

import React from "react";
import {
  Clock,
  FileText,
  AlertCircle,
  Calendar,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/Pagetransition";
import { MOCK_ASSIGNMENTS, MOCK_NOTES, MOCK_SUBJECTS } from "@/lib/constants";

export const Dashboard = () => {
  const upcomingAssignments = MOCK_ASSIGNMENTS.filter(
    (a) => a.status !== "Completed"
  ).slice(0, 3);
  const recentNotes = MOCK_NOTES.slice(0, 2);

  return (
    <PageTransition>
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, Mostafa
            </h1>
            <p className="text-sm md:text-base text-[var(--muted-foreground)]">
              Here&apos;s what&apos;s happening with your studies today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Deadlines */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Clock className="mr-2 text-[var(--primary)]" size={20} />
                Upcoming Deadlines
              </h3>
              <div className="grid gap-4">
                {upcomingAssignments.map((assignment) => (
                  <Card
                    key={assignment.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          assignment.status === "Overdue"
                            ? "bg-[var(--destructive)]/10 text-[var(--destructive)]"
                            : "bg-[var(--primary)]/10 text-[var(--primary)]"
                        }`}
                      >
                        {assignment.status === "Overdue" ? (
                          <AlertCircle size={20} />
                        ) : (
                          <Calendar size={20} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{assignment.title}</p>
                        <p className="text-sm text-[var(--muted-foreground)] truncate">
                          {
                            MOCK_SUBJECTS.find(
                              (s) => s.id === assignment.subjectId
                            )?.name
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <p className="text-sm font-medium">{assignment.deadline}</p>
                      <Badge
                        variant={
                          assignment.status === "Overdue"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Notes */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <FileText className="mr-2 text-[var(--primary)]" size={20} />
                Recent Notes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentNotes.map((note) => (
                  <Card
                    key={note.id}
                    className="p-4 space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium line-clamp-1">{note.title}</h4>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical size={14} />
                      </Button>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {note.updatedAt}
                      </span>
                      <span className="text-xs font-medium truncate ml-2">
                        {
                          MOCK_SUBJECTS.find((s) => s.id === note.subjectId)
                            ?.name
                        }
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Panel */}
          <div className="space-y-6">
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Pending Assignments</h3>
              <div className="space-y-3">
                {MOCK_ASSIGNMENTS.filter((a) => a.status === "Pending").map(
                  (a) => (
                    <div
                      key={a.id}
                      className="flex items-center space-x-3 p-2 hover:bg-[var(--accent)] rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)] flex-shrink-0"></div>
                      <span className="text-sm font-medium flex-1 group-hover:text-[var(--primary)] transition-colors truncate">
                        {a.title}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-[var(--muted-foreground)] flex-shrink-0"
                      />
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};