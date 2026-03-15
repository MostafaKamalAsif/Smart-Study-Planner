export type Status = "Pending" | "Completed" | "Overdue";

export interface Semester {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  subjectCount: number;
}

export interface Subject {
  id: string;
  semesterId: string;
  name: string;
  instructor: string;
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  deadline: string;
  status: Status;
}

export interface Note {
  id: string;
  subjectId: string;
  title: string;
  content: string;
  updatedAt: string;
}