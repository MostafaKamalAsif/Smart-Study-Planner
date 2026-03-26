"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarRange,
  BookMarked,
  ClipboardList,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  currentPath: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/semesters", label: "Semesters", icon: CalendarRange },
  { href: "/subjects", label: "Subjects", icon: BookMarked },
  { href: "/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({
  currentPath,
  isDarkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const sidebarContent = (
    <>
      <div className="p-6 flex items-center justify-between">
        {(!isCollapsed || isMobileMenuOpen) && (
          <div className=" ">
            
            <span className="font-bold text-[18px] ">Smart Study Planner</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            isMobileMenuOpen
              ? setIsMobileMenuOpen(false)
              : setIsCollapsed(!isCollapsed)
          }
          className={`${isMobileMenuOpen ? "flex" : "hidden md:flex"} ml-auto`}
        >
          {isMobileMenuOpen ? (
            <X size={18} />
          ) : isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
              }`}
            >
              <Icon size={20} />
              {(!isCollapsed || isMobileMenuOpen) && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)] space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-all cursor-pointer"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          {(!isCollapsed || isMobileMenuOpen) && (
            <span className="font-medium">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        <div
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
            isCollapsed && !isMobileMenuOpen ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center overflow-hidden flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/me/100/100"
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
          </div>
          {(!isCollapsed || isMobileMenuOpen) && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Mostafa Kamal</p>
                <p className="text-xs text-[var(--muted-foreground)] truncate">
                  Student
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="text-[var(--muted-foreground)] hover:text-[var(--destructive)] cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex h-screen border-r border-[var(--border)] bg-[var(--card)] transition-all duration-300 flex-col ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[var(--card)] border-r border-[var(--border)] transform transition-transform duration-300 md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};