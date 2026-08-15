"use client";

import {
  Ambulance,
  ArrowLeft,
  Camera,
  Instagram,
  MapPin,
  PhoneCall,
  Video,
  X,
  Youtube
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ContactScreenProps {
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

export function ContactScreen({ onNavigate }: ContactScreenProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="space-y-10 pb-12">
      {/* Top Navigation Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" /> Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" /> Clinic Location & Helpline
        </div>
        <h1 className="text-3xl font-black text-white">Contact & Emergency Desk</h1>
        <p className="text-slate-300 text-sm">
          Reach Dr. Diksha Asati & Dr. Rahul Asati at Pearl Clinic, Kachanr City Road, Vijay Nagar, Jabalpur for OPD appointments or urgent care.
        </p>
      </div>

      {/* Online Consultation & Social Links Banner */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Video className="w-4 h-4" /> Online Consultation Available
          </div>
          <h2 className="text-lg font-bold text-white">Tele-Consultation & Online Appointments</h2>
          <p className="text-xs text-slate-300">
            Consult Dr. Diksha Asati & Dr. Rahul Asati from anywhere via online video consultation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <a
            href="https://youtube.com/@dikshaasati8061?si=FjGfiKMdlvIbM_Pf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Youtube className="w-4 h-4" /> YouTube Channel ↗
          </a>
          <a
            href="https://www.instagram.com/paeditrust?igsh=MWw2aGs3enRzdGlqeQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-white border border-pink-500/30 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" /> Instagram (@paeditrust) ↗
          </a>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="emergency-banner p-6 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border border-rose-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/30">
            <Ambulance className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">24/7 Medical Emergency Hotline</h2>
            <p className="text-xs text-rose-200 mt-0.5">
              Direct Helpline: <a href="tel:+919981342401" className="font-extrabold text-white underline">+91 9981342401</a> | For fever, breathing distress, asthma or urgent care.
            </p>
          </div>
        </div>
        <a
          href="tel:+919981342401"
          className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-600/40 flex items-center gap-2 transition-transform transform hover:scale-105 shrink-0"
        >
          <PhoneCall className="w-4 h-4" /> Call +91 9981342401
        </a>
      </div>

      {/* Contact Details & Map */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <MapPin className="w-5 h-5 text-sky-400" /> Pearl Clinic Location & Directions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Address</span>
            <p className="font-bold text-white">
              Pearl Clinic, Kachanr City Road, Opposite Children Book House, Vijay Nagar, Jabalpur, Madhya Pradesh 482002
            </p>
            <p className="text-xs text-slate-400">Direct Landmark: Opposite Children Book House, Vijay Nagar</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">OPD Consultation Schedule</span>
            <p className="font-bold text-white">Monday to Saturday (Regular OPD)</p>
            <p className="text-xs text-amber-400 font-semibold">Sunday Available (On Appointment)</p>
          </div>
        </div>

        {/* Interactive Map Visual Box */}
        <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/60 via-slate-900 to-emerald-950/50 placeholder-grid" />
          <div className="relative z-10 space-y-3">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto animate-bounce border border-sky-500/30">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Pearl Clinic Vijay Nagar</div>
              <p className="text-xs text-slate-300">View Clinic Location on Google Maps</p>
            </div>
            <a
              href="https://maps.app.goo.gl/aUikgA6Swf9QxvSUA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-transform transform hover:scale-105 cursor-pointer"
            >
              <MapPin className="w-4 h-4" /> Open Clinic Location (Google Maps)
            </a>
          </div>
        </div>
      </div>

      {/* Authentic Pearl Clinic Facility Photos */}
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
    </div>
  );
}
