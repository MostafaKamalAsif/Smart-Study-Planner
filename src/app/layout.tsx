import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: " Smart Study Planner",
  description: "Organize semesters, track assignments, and manage notes in one beautiful workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}