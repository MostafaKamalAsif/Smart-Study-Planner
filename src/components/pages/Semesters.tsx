"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/Modal";
import { MOCK_SEMESTERS } from "@/lib/constants";
import { PageTransition } from "../ui/Pagetransition";
import { SemesterCard } from "../card/Semestercard";

export const Semesters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewSubjects = (id: string) => {
    console.log("View subjects for semester:", id);
    // e.g. router.push(`/semesters/${id}/subjects`)
  };

  const handleCardClick = (id: string) => {
    console.log("Card clicked:", id);
    // e.g. router.push(`/semesters/${id}`)
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Semesters
          </h1>
          <Button className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2" size={18} /> Add Semester
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SEMESTERS.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onViewSubjects={handleViewSubjects}
              onClick={handleCardClick}
            />
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Semester"
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Semester Name</label>
              <Input placeholder="e.g. Fall 2024" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input type="date" required />
              </div>
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
                Create Semester
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </PageTransition>
  );
};