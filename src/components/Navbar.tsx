"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Leaf, ShoppingBag, Heart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/productos", label: "Productos", icon: ShoppingBag },
    { href: "/blog", label: "Blog", icon: Leaf },
    { href: "/mezclas", label: "Mezclas", icon: Heart },
  ];

  return (
    <>
      {/* Backdrop blur overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-emerald-500/10 border-b border-emerald-100/50"
            : "bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-sm"
        }`}
      >
        {/* Subtle gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo with enhanced styling and background for contrast */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Dynamic background */}
                <div className="absolute -inset-2 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl opacity-95 group-hover:opacity-100 transition-all duration-300 shadow-lg"></div>
                {/* Accent border */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 blur-sm"></div>
                {/* Logo container */}
                <div className="relative z-10 px-3 py-1 rounded-xl">
                  <Image
                    src="/Logo.png"
                    alt="Logo Hatsu"
                    width={140}
                    height={45}
                    priority
                    className="group-hover:scale-105 transition-transform duration-300 filter brightness-100"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-600 font-medium transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <item.icon
                      size={18}
                      className="group-hover:text-emerald-500 transition-colors duration-300"
                    />
                    <span>{item.label}</span>
                  </div>
                  {/* Underline effect */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                </Link>
              ))}

              {/* CTA Button */}
              <div className="ml-6 pl-6 border-l border-slate-200">
                <button className="cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                  Comprar ahora
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden relative p-2 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/98 backdrop-blur-xl border-t border-emerald-100/50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center space-x-3 p-4 rounded-xl text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 font-medium transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isOpen
                        ? "slideInRight 0.5s ease-out forwards"
                        : "none",
                    }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200 transition-colors duration-300">
                      <item.icon
                        size={20}
                        className="text-emerald-600 group-hover:text-emerald-700"
                      />
                    </div>
                    <span className="text-lg">{item.label}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    style={{
                      animationDelay: "300ms",
                      animation: isOpen
                        ? "slideInRight 0.5s ease-out forwards"
                        : "none",
                    }}
                  >
                    Comprar ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
