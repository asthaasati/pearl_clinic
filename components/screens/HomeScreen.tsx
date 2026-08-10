"use client";

import {
  CalendarCheck,
  ChevronRight,
  Instagram,
  Sparkles,
  UserCheck,
  Video,
  Youtube
} from "lucide-react";
import Image from "next/image";
import { ReviewsSection } from "../sections/ReviewsSection";

interface HomeScreenProps {
  onNavigate: (screenId: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden rounded-3xl glass-card border border-slate-800 p-6 md:p-10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-sky-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-300 text-xs font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Vaccination Available
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Video className="w-3.5 h-3.5" /> Online Consultation Available
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Gentle Pediatric & Advanced <span className="shimmer-text">Pulmonology Care</span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Super-specialty clinical care by <strong className="text-white">Dr. Diksha Asati</strong> (MBBS, MD Pediatrics) & <strong className="text-white">Dr. Rahul Asati</strong> (MBBS, MD Pulmonologist). Comprehensive OPD, PICU/NICU, Spirometry (PFT), Asthma & COPD care, and Sleep Disorders.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate("appointment")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-sky-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Consultation
              </button>

              <button
                onClick={() => onNavigate("services")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-sky-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all cursor-pointer"
              >
                Explore Services
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>
          </div>

          {/* Animated Pearl Logo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 text-center shadow-2xl flex flex-col items-center group">
              <div className="absolute inset-0 rounded-3xl bg-sky-500/5 group-hover:bg-sky-500/10 transition-colors" />

              <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 animate-float">
                <Image
                  src="/logo.png"
                  alt="Pearl Clinic Logo"
                  fill
                  className="object-contain filter drop-shadow(0 12px 24px rgba(14,165,233,0.3))"
                  priority
                />
              </div>

              <p className="text-xs text-sky-400 font-semibold mb-4">Pediatric & Pulmonology Center</p>

              <div className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> OPD Open Now
                </span>
                <a
                  href="https://maps.app.goo.gl/aUikgA6Swf9QxvSUA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline font-semibold"
                >
                  Vijay Nagar, Jabalpur 📍
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Highlight Banner */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-sky-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-sky-500/40 bg-slate-900 shrink-0">
                <Image
                  src="/diksha.jpeg"
                  alt="Dr. Diksha Asati"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Dr. Diksha Asati</h3>
                <p className="text-xs text-sky-400 font-semibold">MBBS, MD Pediatrics</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Specialist in Newborn Care, Vaccination, Pediatric Nutrition, Infectious Diseases, and Growth & Development.
            </p>
            <button
              onClick={() => onNavigate("doctor")}
              className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Dr. Diksha Profile <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dr. Rahul Asati */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-teal-500/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-teal-500/30 relative flex-shrink-0">
                <Image
                  src="/rahul.jpg"
                  alt="Dr. Rahul Asati"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Dr. Rahul Asati</h3>
                <span className="text-xs text-teal-400 font-semibold">MBBS, MD Pulmonologist</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Specialist in Spirometry & Lung Function Testing, Asthma & COPD Care, Chronic Cough, Allergy & Sleep Disorders.
            </p>
            <button
              onClick={() => onNavigate("doctor")}
              className="text-xs font-bold text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Dr. Rahul Profile <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <ReviewsSection />
    </div>
  );
}
