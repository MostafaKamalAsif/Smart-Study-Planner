"use client";

import React, { useState } from "react";
import {
  Plus,
  Clock,
  CheckCircle2,
  Edit2,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageTransition } from "@/components/ui/PageTransition";
import { MOCK_ASSIGNMENTS, MOCK_SUBJECTS } from "@/lib/constants";
import { Status } from "@/types";


const getStatusBadge = (status: Status) => {
  switch (status) {
    case "Completed":
      return <Badge variant="success">{status}</Badge>;
    case "Overdue":
      return <Badge variant="destructive">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
