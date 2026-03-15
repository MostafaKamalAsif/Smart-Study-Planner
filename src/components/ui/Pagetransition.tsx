"use client";

import { motion } from "framer-motion";
import React from "react";


export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);