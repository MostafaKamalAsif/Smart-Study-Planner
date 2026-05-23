"use client";

import React, { useState } from "react";
import {
  Plus,
  Clock,
  CheckCircle2,
  Edit2,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/ui/PageTransition";
import { MOCK_ASSIGNMENTS, MOCK_SUBJECTS } from "@/lib/constants";
import { Status } from "@/types";

const getStatusBadge = (status: Status) => {
  switch (status) {
    case "Completed":
      return <Badge >{status}</Badge>;
    case "Overdue":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const Assignments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Assignments
          </h1>
          <Button className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2" size={18} /> Add Assignment
          </Button>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[var(--muted)]/50 border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">Title</th>
                  <th className="px-6 py-4 text-sm font-semibold">Subject</th>
                  <th className="px-6 py-4 text-sm font-semibold">Deadline</th>
                  <th className="px-6 py-4 text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {MOCK_ASSIGNMENTS.map((assignment) => (
                  <tr
                    key={assignment.id}
                    className="hover:bg-[var(--accent)]/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium">
                      {assignment.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--muted-foreground)]">
                      {
                        MOCK_SUBJECTS.find((s) => s.id === assignment.subjectId)
                          ?.name
                      }
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--muted-foreground)]">
                      {assignment.deadline}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {getStatusBadge(assignment.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[var(--destructive)]"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {MOCK_ASSIGNMENTS.map((assignment) => (
            <Card key={assignment.id} className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold">{assignment.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {
                      MOCK_SUBJECTS.find((s) => s.id === assignment.subjectId)
                        ?.name
                    }
                  </p>
                </div>
                {getStatusBadge(assignment.status)}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <div className="flex items-center text-sm text-[var(--muted-foreground)]">
                  <Clock size={14} className="mr-1" />
                  {assignment.deadline}
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--destructive)]"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Assignment"
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Assignment Title</label>
              <Input placeholder="e.g. Final Research Paper" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <select className="flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                {MOCK_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>
              <Input type="date" required />
            </div>
            <div className="pt-4 flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" type="submit">
                Create Assignment
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};


