"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Home,
  BookMarked,
  Mic,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Hamburger for small screens */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 h-full top-0 left-0 bg-card border-r border-gray-300 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-0 md:w-64"
        } overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            {sidebarOpen && (
              <span className="text-xl font-bold">EchoLearn</span>
            )}
          </div>

          {/* Toggle for medium+ screens */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex"
          >
            <ChevronRight
              className={`h-4 w-4 transition-all ${
                !sidebarOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { href: "/dashboard", icon: Home, label: "Dashboard" },
            { href: "/dashboard/decks", icon: BookMarked, label: "My Decks" },
            { href: "/dashboard/practice", icon: Mic, label: "Voice Practice" },
            { href: "/dashboard/stats", icon: BarChart3, label: "Statistics" },
            { href: "/dashboard/settings", icon: Settings, label: "Settings" },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className={`w-full justify-${sidebarOpen ? "start" : "center"}`}
              >
                <Icon className={`h-5 w-5 ${sidebarOpen ? "mr-2" : ""}`} />
                {sidebarOpen && <span>{label}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-300 mt-auto">
          <Link href="/signout">
            <Button
              variant="ghost"
              className={`w-full justify-${
                sidebarOpen ? "start" : "center"
              } text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20`}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {sidebarOpen && <span>Sign Out</span>}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto ml-0 md:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
