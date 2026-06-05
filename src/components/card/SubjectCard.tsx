//subject.tsx

"use client";

import React, { useState } from "react";
import { Plus, BookMarked, Edit2, Trash2, ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/ui/PageTransition";
import { MOCK_SUBJECTS, MOCK_SEMESTERS } from "@/lib/constants";

export const Subjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Subjects
          </h1>
          <Button className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2" size={18} /> Add Subject
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SUBJECTS.map((subject) => (
            <Card key={subject.id} className="p-6 space-y-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center text-[var(--primary)] flex-shrink-0">
                  <BookMarked size={24} />
                </div>
                <div className="flex space-x-1">
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
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="text-lg font-bold truncate">{subject.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)] truncate">
                  {subject.instructor}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                <span className="truncate mr-2">
                  {MOCK_SEMESTERS.find((s) => s.id === subject.semesterId)?.name}
                </span>
                <span className="flex items-center flex-shrink-0">
                  <ClipboardList className="mr-1" size={12} /> 4 Assignments
                </span>
              </div>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Subject"
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject Name</label>
              <Input placeholder="e.g. Advanced Mathematics" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Instructor</label>
              <Input placeholder="e.g. Dr. Sarah Smith" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Semester</label>
              <select className="flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                {MOCK_SEMESTERS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
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
                Add Subject
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};


export default Subjects;










