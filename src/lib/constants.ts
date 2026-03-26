import { Semester, Subject, Assignment, Note } from "@/types";

export const MOCK_SEMESTERS: Semester[] = [
  {
    id: "1",
    name: "Spring 2024",
    startDate: "2024-01-15",
    endDate: "2024-05-20",
    subjectCount: 5,
  },
  {
    id: "2", 
    name: "Fall 2023",
    startDate: "2023-08-25",
    endDate: "2023-12-15",
    subjectCount: 4,
  },
];

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "s1",
    semesterId: "1",
    name: "Advanced Mathematics",
    instructor: "Dr. Sarah Smith",
  },
  {
    id: "s2",
    semesterId: "1",
    name: "Computer Architecture",
    instructor: "Prof. James Wilson",
  },
  {
    id: "s3",
    semesterId: "1",
    name: "Database Systems",
    instructor: "Dr. Emily Brown",
  },
  {
    id: "s4",
    semesterId: "2",
    name: "Introduction to AI",
    instructor: "Prof. Alan Turing",
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "a1",
    subjectId: "s1",
    title: "Calculus Problem Set 4",
    deadline: "2024-03-20",
    status: "Pending",
  },
  {
    id: "a2",
    subjectId: "s2",
    title: "CPU Design Project",
    deadline: "2024-03-15",
    status: "Overdue",
  },
  {
    id: "a3",
    subjectId: "s3",
    title: "SQL Optimization Lab",
    deadline: "2024-03-25",
    status: "Completed",
  },
  {
    id: "a4",
    subjectId: "s1",
    title: "Linear Algebra Quiz",
    deadline: "2024-03-18",
    status: "Pending",
  },
];

export const MOCK_NOTES: Note[] = [
  {
    id: "n1",
    subjectId: "s1",
    title: "Integration Techniques",
    content:
      "Focus on integration by parts and partial fractions. Key formulas: ∫u dv = uv - ∫v du. Remember to check for substitution first before attempting integration by parts.",
    updatedAt: "2024-03-10",
  },
  {
    id: "n2",
    subjectId: "s2",
    title: "Cache Memory",
    content:
      "L1, L2, L3 cache hierarchy and mapping techniques. Direct mapping: index = (block address) mod (number of cache blocks). Fully associative allows any block anywhere.",
    updatedAt: "2024-03-12",
  },
];