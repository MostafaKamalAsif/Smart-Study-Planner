"use client";

import React from "react";
import { Edit2, User, Lock, Palette, Moon, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/ui/pageTransition";

export const Settings = () => {
  // Settings page reads dark mode state from the document class
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <PageTransition>
      <div className="max-w-4xl space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>

        {/* Profile */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="mr-2" size={20} /> Profile Information
          </h3>
          <Card className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-[var(--muted)] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://picsum.photos/seed/me/200/200"
                    alt="Profile"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full cursor-pointer">
                  <Edit2 size={18} />
                </button>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xl font-bold">Mostafa Kamal</h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  mostafa@university.edu
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change Avatar
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input defaultValue="Mostafa Kamal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="mostafa@university.edu" />
              </div>
            </div>
            <Button className="w-full sm:w-auto">Save Changes</Button>
          </Card>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Lock className="mr-2" size={20} /> Security
          </h3>
          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Update Password
            </Button>
          </Card>
        </section>

        {/* Appearance */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Palette className="mr-2" size={20} /> Appearance
          </h3>
          <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-medium">Theme Mode</h4>
              <p className="text-sm text-[var(--muted-foreground)]">
                Switch between light and dark theme
              </p>
            </div>
            <Button variant="outline" onClick={toggleDark} className="w-full sm:w-auto">
              {isDark ? (
                <Sun className="mr-2" size={18} />
              ) : (
                <Moon className="mr-2" size={18} />
              )}
              {isDark ? "Light Mode" : "Dark Mode"}
            </Button>
          </Card>
        </section>
      </div>
    </PageTransition>
  );
};