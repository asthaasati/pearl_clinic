"use client";

import {
  CalendarCheck,
  Camera,
  ChevronRight,
  MapPin,
  Sparkles,
  Video,
  X
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ReviewsSection } from "../sections/ReviewsSection";

interface HomeScreenProps {
  onNavigate: (screenId: string) => void;
}

const clinicPhotos = [
  {
    src: "/clinic/real_photo_5.jpg",
    title: "Pearl Clinic Main Entrance & Building Exterior",
    category: "Clinic Exterior"
  },
  {
    src: "/clinic/real_photo_3.png",
    title: "Main Reception Desk & Pearl Clinic Emblem",
    category: "Reception Lounge"
  },
  {
    src: "/clinic/real_photo_1.png",
    title: "Doctor Consultation Room & Award Gallery",
    category: "Consultation Suite"
  },
  {
    src: "/clinic/real_photo_2.png",
    title: "Pediatric Dispensary & Child Theme Decor",
    category: "Child OPD Pharmacy"
  },
  {
    src: "/clinic/real_photo_4.png",
    title: "Outpatient Examination & Doctor Desk",
    category: "Examination Desk"
  }
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

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

            <p className="text-slate-200 text-lg md:text-xl font-bold tracking-wide">
              Dr. Diksha Asati & Dr. Rahul Asati
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
                <p className="text-xs text-sky-400 font-semibold">MBBS, MD Pediatrics, IDPCCM</p>
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
                <span className="text-xs text-teal-400 font-semibold">MBBS, MD, Pulmonologist, Critical Care Specialist</span>
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

      {/* Authentic Pearl Clinic Facility Photos Gallery */}
      <section className="p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
              <Camera className="w-4 h-4" /> Authentic Clinic View
            </div>
            <h2 className="text-2xl font-black text-white">Pearl Clinic Photos</h2>
            <p className="text-xs text-slate-300">
              Actual photos of our main reception lounge, consultation suites, child OPD dispensary, and examination rooms in Vijay Nagar, Jabalpur.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clinicPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(photo.src)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer transition-all hover:border-sky-500/50 shadow-xl"
            >
              <div className="relative w-full h-48">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-sky-300">
                  {photo.category}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-400" /> Click to enlarge photo
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Photo Preview */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-pointer animate-in fade-in"
          >
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden">
                <Image
                  src={selectedPhoto}
                  alt="Pearl Clinic Authentic View"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 text-center">
                <a
                  href="https://maps.app.goo.gl/aUikgA6Swf9QxvSUA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5" /> View Pearl Clinic Location on Google Maps
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Patient Reviews Section */}
      <ReviewsSection />
    </div>
  );
}
