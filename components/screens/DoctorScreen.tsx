"use client";

import {
  ArrowLeft,
  Award,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  HeartPulse,
  Stethoscope
} from "lucide-react";
import Image from "next/image";

interface DoctorScreenProps {
  onNavigate: (screenId: string) => void;
}

export function DoctorScreen({ onNavigate }: DoctorScreenProps) {
  return (
    <div className="space-y-12 pb-12">
      {/* Top Navigation Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" /> Back to Dashboard
        </button>
      </div>

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4 text-sky-400" /> Specialist Medical Consultants
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white">Our Medical Experts</h1>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed text-center">
          Dedicated specialist care in Pediatrics, Pediatric Critical Care, and Adult & Childhood Pulmonology at Pearl Clinic, Jabalpur.
        </p>
      </div>

      {/* DOCTOR 1: Dr. Diksha Asati */}
      <section className="relative p-8 md:p-10 rounded-3xl glass-card border border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-3xl overflow-hidden border-2 border-sky-500/40 bg-slate-950 flex flex-col items-center justify-center text-center shadow-2xl group">
              <Image
                src="/diksha.jpeg"
                alt="Dr. Diksha Asati"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Gold Medalist Pediatrician
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white">
              Dr. Diksha Asati <span className="text-slate-400 text-lg font-medium block md:inline">(MBBS, MD Pediatrics, IDPCCM)</span>
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Senior Consultant Pediatrician & Critical Care Specialist in Vijay Nagar, Jabalpur. Recognized for clinical excellence in pediatric intensive care, childhood asthma management, neonatal resuscitation, and diagnostic bronchoscopy.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Qualifications</div>
                <div className="text-sm font-bold text-sky-400">MBBS, MD, IDPCCM</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Specialization</div>
                <div className="text-sm font-bold text-emerald-400">PICU / NICU & Pediatrics</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-400">Honors</div>
                <div className="text-sm font-bold text-amber-400">Gold Medalist</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("appointment")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-sky-500/20 flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" /> Book Consultation with Dr. Diksha
              </button>
            </div>
          </div>
        </div>

        {/* Dr. Diksha Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-800/80">
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-lg border-b border-slate-800/80 pb-3">
              <GraduationCap className="w-5 h-5" /> Qualifications & Medical Credentials
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-white text-sm block">Doctor of Medicine (MD) - Pediatrics</strong>
                  <span className="text-xs text-slate-400">Awarded Gold Medal for academic and clinical excellence.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-white text-sm block">Fellowship in Pediatric Critical Care Medicine (IDPCCM)</strong>
                  <span className="text-xs text-slate-400">Specialized training in invasive ventilation, PICU/NICU pathways, and emergency triage.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-white text-sm block">MBBS - Registered Practitioner</strong>
                  <span className="text-xs text-slate-400">State Medical Council Registered.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg border-b border-slate-800/80 pb-3">
              <HeartPulse className="w-5 h-5" /> Clinical Focus & Key Procedures
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Bronchoscopy",
                "PICU & NICU Care",
                "Childhood Asthma & Nebulization",
                "Vaccination Cold-Chain",
                "Growth & Development",
                "Newborn Resuscitation"
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200"
                >
                  • {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR 2: Dr. Rahul Asati - Pulmonologist */}
      <section className="relative p-8 md:p-10 rounded-3xl glass-card border border-teal-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-3xl overflow-hidden border-2 border-teal-500/40 bg-slate-950 flex flex-col items-center justify-center text-center shadow-2xl group">
              <Image
                src="/rahul.jpg"
                alt="Dr. Rahul Asati"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <span>🫁</span> Pulmonology & Chest Specialist
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white">
              Dr. Rahul Asati <span className="text-slate-400 text-lg font-medium block md:inline">(MBBS, MD, Pulmonologist, Critical Care Specialist)</span>
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Consultant Pulmonologist & Critical Care Specialist at Pearl Clinic. Expert in comprehensive pulmonary diagnostics, Bronchoscopy, Spirometry & Lung Function Testing, Asthma & COPD care, allergic respiratory disorders, and sleep apnea evaluation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Qualifications</div>
                <div className="text-xs font-bold text-teal-400">MBBS, MD, Pulmonologist, Critical Care Specialist</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Specialization</div>
                <div className="text-sm font-bold text-sky-400">Pulmonology & Chest</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-400">Clinical Focus</div>
                <div className="text-sm font-bold text-emerald-400">Asthma, COPD & PFT</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("appointment")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-white font-bold text-sm shadow-xl shadow-teal-500/20 flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" /> Book Consultation with Dr. Rahul
              </button>
            </div>
          </div>
        </div>

        {/* Dr. Rahul Details Grid - Same template layout as Dr. Diksha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-800/80">
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-lg border-b border-slate-800/80 pb-3">
              <GraduationCap className="w-5 h-5" /> Qualifications & Medical Credentials
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-white text-sm block">Doctor of Medicine (MD) - Pulmonology</strong>
                  <span className="text-xs text-slate-400">Specialized in adult & pediatric respiratory care and pulmonary medicine.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-white text-sm block">Consultant Pulmonologist & Chest Specialist</strong>
                  <span className="text-xs text-slate-400">Expert in Diagnostic Bronchoscopy, Spirometry (PFT), Asthma & COPD management.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <div>
                  <strong className="text-white text-sm block">MBBS - Registered Practitioner</strong>
                  <span className="text-xs text-slate-400">State Medical Council Registered.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-lg border-b border-slate-800/80 pb-3">
              <HeartPulse className="w-5 h-5" /> Clinical Focus & Key Procedures
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Bronchoscopy",
                "Spirometry & Lung Function Testing (PFT)",
                "Asthma & COPD Care",
                "Chronic Cough & Allergy Clinic",
                "Nebulization & Inhalation Therapy",
                "Sleep & Respiratory Disorders"
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200"
                >
                  • {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

