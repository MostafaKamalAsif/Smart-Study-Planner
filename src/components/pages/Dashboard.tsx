"use client";

import React from "react";
import { Clock, FileText } from "lucide-react";

import { MOCK_ASSIGNMENTS, MOCK_NOTES } from "@/lib/constants";
import { PageTransition } from "../ui/Pagetransition";
import { AssignmentCard } from "../card/Assignmentcard";
import { NoteCard } from "../card/Notecard";
import { PendingAssignmentItem } from "../card/Pendingassignmentitem";



export const Dashboard = () => {
  const upcomingAssignments = MOCK_ASSIGNMENTS.filter(
    (a) => a.status !== "Completed"
  ).slice(0, 3);

  const recentNotes = MOCK_NOTES.slice(0, 2);

  const pendingAssignments = MOCK_ASSIGNMENTS.filter(
    (a) => a.status === "Pending"
  );



  return (
    <PageTransition>
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm md:text-base text-[var(--muted-foreground)]">
              Here&apos;s what&apos;s happening with your studies today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Upcoming Deadlines */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Clock className="mr-2 text-[var(--primary)]" size={20} />
                Upcoming Deadlines
              </h3>
              <div className="grid gap-4">
                {upcomingAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                  
                  />
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
                  <NoteCard
                    key={note.id}
                    note={note}
                    
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Pending Assignments</h3>
              <div className="space-y-3">
                {pendingAssignments.map((assignment) => (
                  <PendingAssignmentItem
                    key={assignment.id}
                    assignment={assignment}
                    
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};