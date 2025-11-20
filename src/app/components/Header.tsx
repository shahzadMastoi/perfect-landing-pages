"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="relative w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-indigo-900 to-indigo-700 text-white z-50">
      {/* Brand */}
      <Link href="/" className="text-xl font-bold">
        Perfect Landing Pages
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition hover:text-teal-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-6 mt-2 w-48 bg-indigo-800 rounded-lg shadow-lg p-4 flex flex-col space-y-3 md:hidden z-50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-left transition hover:text-teal-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
