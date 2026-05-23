

"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Card } from '@/components/ui/card'
import { Modal } from "@/components/ui/Modal";
import { Button } from '@/components/ui/button'
import { PageTransition } from "@/components/ui/PageTransition";
import { Input } from "@/components/ui/input";
import { MOCK_NOTES, MOCK_SUBJECTS } from "@/lib/constants";

export const Notes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notes</h1>
          <Button className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2" size={18} /> New Note
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Subject Filter */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
              Subjects
            </h3>
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 lg:space-y-1 no-scrollbar">
              {MOCK_SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  className="flex-shrink-0 lg:w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--accent)] transition-colors flex items-center justify-between group whitespace-nowrap lg:whitespace-normal cursor-pointer"
                >
                  <span>{s.name}</span>
                  <span className="hidden lg:inline text-xs text-[var(--muted-foreground)] group-hover:text-[var(--primary)] ml-2">
                    2
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_NOTES.map((note) => (
              <Card
                key={note.id}
                className="p-6 space-y-4 flex flex-col hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold truncate">{note.title}</h3>
                  <div className="flex space-x-1 flex-shrink-0">
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
                <p className="text-sm text-[var(--muted-foreground)] flex-1 line-clamp-4">
                  {note.content}
                </p>
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  <span className="truncate mr-2">
                    {MOCK_SUBJECTS.find((s) => s.id === note.subjectId)?.name}
                  </span>
                  <span className="flex-shrink-0">Updated {note.updatedAt}</span>
                </div>
              </Card>
            ))}

            {/* Add Note Card */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-[var(--border)] rounded-xl p-6 flex flex-col items-center justify-center text-[var(--muted-foreground)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-all space-y-2 min-h-[200px] cursor-pointer"
            >
              <Plus size={32} />
              <span className="font-medium">Create new note</span>
            </button>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Note"
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Note Title</label>
              <Input placeholder="e.g. Lecture 1: Introduction" required />
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
              <label className="text-sm font-medium">Content</label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="Start typing your notes..."
              />
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
                Save Note
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};

export default Notes;