"use client";
import "./globals.css";
import React from "react";

function DarkModeToggle() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return (
    <button
      className="relative w-12 h-7 rounded-full bg-gradient-to-r from-blue-400 to-fuchsia-500 flex items-center transition-all duration-300 focus:outline-none shadow-inner focus:ring-2 focus:ring-fuchsia-400"
      aria-label="Toggle dark mode"
      onClick={() => setDark(d => !d)}
    >
      <span className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 shadow transition-transform duration-300 ${dark ? 'translate-x-5' : ''}`}></span>
      <span className="absolute left-2 top-2 text-xs animate-fade-in">{dark ? '🌙' : '☀️'}</span>
    </button>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] dark:from-zinc-950 dark:to-zinc-900 min-h-screen transition-colors duration-500">
        {/* Premium Header */}
        <header className="w-full sticky top-0 z-30 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg shadow-md border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 py-3 animate-fade-in">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm tracking-tight select-none">Reviewly</span>
          <DarkModeToggle />
        </header>
        {children}
      </body>
    </html>
  );
}
