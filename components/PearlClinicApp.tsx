"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Stethoscope,
  Sun,
  UserCheck,
  Video,
  X
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AppointmentScreen } from "./screens/AppointmentScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { DoctorScreen } from "./screens/DoctorScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ServicesScreen } from "./screens/ServicesScreen";
import { SplashScreen } from "./screens/SplashScreen";

export type ScreenType = "splash" | "home" | "services" | "doctor" | "appointment" | "contact";

export function PearlClinicApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("splash");
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("pearl_theme") as "dark" | "light" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === "light") {
          document.documentElement.classList.add("light");
        } else {
          document.documentElement.classList.remove("light");
        }
      }
    } catch (e) {
      console.error("Theme storage read error:", e);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("pearl_theme", nextTheme);
    } catch (e) {
      console.error("Theme storage save error:", e);
    }
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const handleNavigate = (screenId: string, preselectedService?: string) => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
    setCurrentScreen(screenId as ScreenType);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "services", label: "Services", icon: Stethoscope },
    { id: "doctor", label: "Doctor", icon: UserCheck },
    { id: "appointment", label: "Book OPD", icon: CalendarCheck },
    { id: "contact", label: "Contact", icon: MapPin }
  ];

  // Render splash screen full frame when currentScreen === 'splash'
  if (currentScreen === "splash") {
    return <SplashScreen onComplete={() => setCurrentScreen("home")} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans placeholder-grid relative selection:bg-sky-500 selection:text-white">
      {/* Top Glass Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Brand Logo & Title with Full Form */}
          <div
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1 group-hover:border-sky-500/50 transition-colors shrink-0">
              <Image
                src="/logo.png"
                alt="Pearl Clinic Logo"
                width={40}
                height={40}
                className="object-contain filter drop-shadow(0 4px 8px rgba(14,165,233,0.3))"
              />
            </div>

            <div className="space-y-0.5">
              <span className="font-black text-base sm:text-lg md:text-xl text-white tracking-tight shimmer-text whitespace-nowrap block">
                PEARL CLINIC
              </span>
              <p className="text-[10px] sm:text-[11px] text-sky-400 font-semibold tracking-wide whitespace-nowrap">
                Paediatric Excellence And Respiratory Life
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-lg shadow-sky-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            {/* WhatsApp Header Button */}
            <a
              href="https://wa.me/919981342401"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Chat on WhatsApp +91 9981342401"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">+91 9981342401</span>
            </a>

            {/* Theme Toggle Button (Light/Dark Mode) */}
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-500" />
              )}
            </button>

            {/* Emergency Phone Button */}
            <a
              href="tel:+919981342401"
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Call Helpline +91 9981342401"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">+91 9981342401</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden p-4 bg-slate-950 border-b border-slate-800 space-y-3">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Video className="w-4 h-4" />
              <span>Online Consultation Available</span>
            </div>

            {/* WhatsApp Link in Mobile Menu */}
            <a
              href="https://wa.me/919981342401"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp +91 9981342401
              </span>
              <span>↗</span>
            </a>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                {theme === "dark" ? "Switch Light" : "Switch Dark"}
              </span>
            </button>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full p-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? "bg-sky-500 text-white font-bold"
                      : "bg-slate-900/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Multi-Screen Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32 lg:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {currentScreen === "home" && <HomeScreen onNavigate={handleNavigate} />}
            {currentScreen === "services" && <ServicesScreen onNavigate={handleNavigate} />}
            {currentScreen === "doctor" && <DoctorScreen onNavigate={handleNavigate} />}
            {currentScreen === "appointment" && (
              <AppointmentScreen initialService={selectedService} onNavigate={handleNavigate} />
            )}
            {currentScreen === "contact" && <ContactScreen onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Action Button on Every Page */}
      <a
        href="https://wa.me/919981342401"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/50 flex items-center gap-2 font-bold text-xs transition-all transform hover:scale-110 group cursor-pointer border border-emerald-400/40"
        title="Chat on WhatsApp (+91 9981342401)"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
        <span className="hidden sm:inline font-extrabold pr-1">WhatsApp Chat</span>
      </a>

      {/* Mobile Floating Bottom Dock Navigation */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden w-[94%] max-w-md bg-slate-900/95 backdrop-blur-2xl border border-slate-800/90 p-2.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`px-3 py-1.5 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer ${
                isActive ? "text-sky-400 font-bold scale-105" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modern Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-8 pb-28 lg:pb-8 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
            <span className="font-bold text-slate-300">Pearl Clinic</span> — Paediatric Excellence And Respiratory Life
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://wa.me/919981342401"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp +91 9981342401
            </a>
            <a
              href="https://maps.app.goo.gl/aUikgA6Swf9QxvSUA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline font-semibold"
            >
              Kachanr City Road, Opposite Children Book House, Vijay Nagar, Jabalpur 📍
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} Pearl Clinic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
