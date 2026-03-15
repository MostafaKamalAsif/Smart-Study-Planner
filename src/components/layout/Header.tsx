"use client";

import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const Header = ({ title, onMenuClick }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </Button>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight capitalize">
          {title}
        </h2>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative hidden lg:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-9 w-48 xl:w-64 rounded-full bg-[var(--muted)]/50 border-none pl-10 pr-4 text-sm focus:ring-1 focus:ring-[var(--primary)] transition-all outline-none"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--destructive)] rounded-full border-2 border-[var(--background)]"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
};