"use client";

import {
  Activity,
  ArrowLeft,
  Baby,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  HeartPulse,
  Hospital,
  Info,
  Search,
  Stethoscope,
  Syringe,
  X
} from "lucide-react";
import React, { useState } from "react";

interface ServicesScreenProps {
  onNavigate: (screenId: string, preselectedService?: string) => void;
}

type ServiceCategory = "All" | "Pediatric" | "Pulmonology";

interface ServiceItem {
  id: string;
  title: string;
  category: "Pediatric" | "Pulmonology";
  doctor?: string;
  icon: React.ElementType;
  summary: string;
  detail: string;
  timings: string;
  requirements: string[];
  recommendedAge: string;
}

const servicesData: ServiceItem[] = [
  // Pediatric Services
  {
    id: "opd",
    title: "Pediatric General OPD",
    category: "Pediatric",
    doctor: "Dr. Diksha Asati",
    icon: Stethoscope,
    summary: "Routine pediatric consultations, growth tracking, fever, cold, diarrhea, and nutrition counseling.",
    detail: "Comprehensive outpatient examination by Dr. Diksha Asati (MBBS, MD (Pediatrics)). Includes physical assessment, weight/height percentile tracking, dietary advice, and prescription guidance.",
    timings: "Mon - Sat OPD Hours",
    requirements: ["Previous medical records (if any)", "Vaccination card"],
    recommendedAge: "0 - 18 Years"
  },
  {
    id: "vaccination",
    title: "Routine & Catch-Up Vaccination",
    category: "Pediatric",
    doctor: "Dr. Diksha Asati",
    icon: Syringe,
    summary: "Complete IAP immunization schedule with strict cold-chain maintenance and painless vaccines.",
    detail: "Protection against Rotavirus, DTP, MMR, Pneumococcal, Typhoid, Hepatitis, and Flu. Catch-up dosage mapping provided for delayed immunizations.",
    timings: "Mon - Sat OPD Hours",
    requirements: ["Child Immunization Record Booklet"],
    recommendedAge: "Birth to 16 Years"
  },
  {
    id: "picu",
    title: "PICU & NICU Hospital Admissions",
    category: "Pediatric",
    doctor: "Dr. Diksha Asati",
    icon: Hospital,
    summary: "Emergency coordination & critical care management for severe pediatric and neonatal illnesses.",
    detail: "Immediate triage and critical care pathways for severe pneumonia, sepsis, seizures, dehydration, or respiratory distress overseen by Fellowship-trained PICU doctor.",
    timings: "24 Hours Emergency Referral",
    requirements: ["Emergency Triage", "Immediate Doctor Call"],
    recommendedAge: "Newborns to 18 Years"
  },
  {
    id: "bronchoscopy",
    title: "Bronchoscopy",
    category: "Pediatric",
    doctor: "Dr. Diksha Asati & Dr. Rahul Asati",
    icon: HeartPulse,
    summary: "Advanced diagnostic airway endoscopy for foreign body inhalation, noisy breathing, or chronic collapse.",
    detail: "Specialized procedure to evaluate congenital airway anomalies, unexplained stridor/wheeze, or accidental peanut/toy foreign body aspiration in infants and children.",
    timings: "By Appointment / Emergency",
    requirements: ["Fasting guidelines (NPO)", "Prior Chest CT/X-Ray"],
    recommendedAge: "Infants & Children"
  },
  {
    id: "growth-development",
    title: "Growth & Development Assessment",
    category: "Pediatric",
    doctor: "Dr. Diksha Asati",
    icon: Baby,
    summary: "Comprehensive tracking of child growth milestones, nutritional status, and developmental screening.",
    detail: "Detailed physical growth percentile evaluation, motor & cognitive milestone tracking, speech assessment, and personalized child nutrition planning under Dr. Diksha Asati.",
    timings: "Mon - Sat OPD Hours",
    requirements: ["Previous health records & growth booklet"],
    recommendedAge: "0 - 18 Years"
  },

  // Pulmonology Services
  {
    id: "spirometry",
    title: "Spirometry & Lung Function Testing (PFT)",
    category: "Pulmonology",
    doctor: "Dr. Rahul Asati",
    icon: Activity,
    summary: "Computerized diagnostic lung volume & airflow capacity measurement for breathlessness and wheezing.",
    detail: "Advanced pulmonary function testing (PFT) conducted under Dr. Rahul Asati (MBBS, MD - Pulmonologist) to evaluate lung volume, airway obstruction, and bronchodilator reversibility.",
    timings: "Mon - Sat OPD Hours",
    requirements: ["Avoid heavy meals 2 hours prior", "List of current inhalers/medications"],
    recommendedAge: "Children & Adults (5+ Years)"
  },
  {
    id: "bronchoscopy-pulmonology",
    title: "Bronchoscopy",
    category: "Pulmonology",
    doctor: "Dr. Rahul Asati & Dr. Diksha Asati",
    icon: HeartPulse,
    summary: "Diagnostic & therapeutic airway endoscopy for chronic cough, localized wheezing, airway lesions, or foreign body evaluation.",
    detail: "Flexible bronchoscopy procedure conducted by senior pulmonologist to directly visualize tracheobronchial tree, evaluate persistent airway obstruction, and perform diagnostic sampling.",
    timings: "By Appointment / Emergency",
    requirements: ["Fasting guidelines (NPO)", "Prior Chest X-Ray / CT Scan"],
    recommendedAge: "All Ages"
  },
  {
    id: "asthma-copd",
    title: "Asthma & COPD Care Clinic",
    category: "Pulmonology",
    doctor: "Dr. Rahul Asati & Dr. Diksha Asati",
    icon: Activity,
    summary: "Comprehensive treatment for bronchial asthma, COPD, chest tightness, and recurrent wheezing.",
    detail: "In-depth respiratory screening, trigger identification, customized inhaler action plans, and peak flow monitoring by Pulmonology experts.",
    timings: "Daily OPD Hours",
    requirements: ["Current inhaler list", "Previous chest X-ray/CT reports"],
    recommendedAge: "All Ages"
  },
  {
    id: "chronic-cough-allergy",
    title: "Chronic Cough & Respiratory Allergy Clinic",
    category: "Pulmonology",
    doctor: "Dr. Rahul Asati",
    icon: HeartPulse,
    summary: "Diagnostic evaluation for persistent cough, allergic rhinitis, post-nasal drip, and hyperreactive airways.",
    detail: "Specialized clinic addressing chronic unexplained cough, seasonal respiratory allergies, and hyperreactive airway disease.",
    timings: "Mon - Sat OPD Hours",
    requirements: ["Allergy history details", "Previous prescriptions"],
    recommendedAge: "All Ages"
  },
  {
    id: "nebulization",
    title: "Nebulization & Inhalation Therapy",
    category: "Pulmonology",
    doctor: "Dr. Rahul Asati & Dr. Diksha Asati",
    icon: Syringe,
    summary: "Supervised aerosolized bronchodilator therapy for acute bronchospasm and severe breathlessness.",
    detail: "Immediate clinical nebulization setup using medical-grade nebulizers, mask sizing, and oxygenation support.",
    timings: "OPD & Emergency Hours",
    requirements: ["Immediate doctor evaluation"],
    recommendedAge: "All Ages"
  },
  {
    id: "sleep-disorders",
    title: "Sleep & Respiratory Disorders Clinic",
    category: "Pulmonology",
    doctor: "Dr. Rahul Asati",
    icon: Hospital,
    summary: "Evaluation and care for nocturnal breathlessness, sleep apnea, snoring, and chronic hypoxia.",
    detail: "Clinical assessment of sleep-disordered breathing, nocturnal oxygenation drops, and upper airway obstruction.",
    timings: "By Appointment",
    requirements: ["Sleep pattern diary", "Snoring history notes"],
    recommendedAge: "All Ages"
  }
];

export function ServicesScreen({ onNavigate }: ServicesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pediatricServices = filteredServices.filter((s) => s.category === "Pediatric");
  const pulmonologyServices = filteredServices.filter((s) => s.category === "Pulmonology");

  const renderServiceCard = (service: ServiceItem) => {
    const IconComponent = service.icon;
    return (
      <div
        key={service.id}
        className="p-6 rounded-2xl glass-card glass-card-hover border border-slate-800 flex flex-col justify-between space-y-4 group"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1.5">
              {service.doctor && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                  {service.doctor}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-sky-300 uppercase tracking-wider">
                {service.category}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{service.summary}</p>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => setActiveModal(service)}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" /> Details & Info
          </button>

          <button
            onClick={() => onNavigate("appointment", service.title)}
            className="px-3.5 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
          >
            Book <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
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
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <Stethoscope className="w-3.5 h-3.5" /> Specialized Healthcare
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white">Clinical Services & Specialties</h1>
        <p className="text-slate-300 text-sm md:text-base">
          Divided into specialized Pediatric and Pulmonology clinical divisions.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {[
            { id: "All", label: "All Services" },
            { id: "Pediatric", label: "Pediatric Services" },
            { id: "Pulmonology", label: "Pulmonology Services" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as ServiceCategory)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Services Divided Sections */}
      <div className="space-y-12">
        {/* Pediatric Division */}
        {pediatricServices.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white">Pediatric Services</h2>
                  <p className="text-xs text-sky-400 font-semibold">Led by Dr. Diksha Asati (MBBS, MD (Pediatrics))</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pediatricServices.map(renderServiceCard)}
            </div>
          </section>
        )}

        {/* Pulmonology Division */}
        {pulmonologyServices.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white">Pulmonology Services</h2>
                  <p className="text-xs text-teal-400 font-semibold">Led by Dr. Rahul Asati (MBBS, MD - Pulmonologist)</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pulmonologyServices.map(renderServiceCard)}
            </div>
          </section>
        )}
      </div>

      {/* Service Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg p-6 rounded-3xl glass-card border border-slate-700 text-white space-y-5 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                <activeModal.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{activeModal.title}</h3>
                <span className="text-xs text-sky-400 font-medium">{activeModal.category} Service</span>
              </div>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-300">
              <p className="leading-relaxed">{activeModal.detail}</p>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" /> Operational Hours:
                </div>
                <div className="text-white font-medium text-xs">{activeModal.timings}</div>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-400">Preparation & Documents Required:</div>
                <ul className="space-y-1">
                  {activeModal.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const serviceName = activeModal.title;
                  setActiveModal(null);
                  onNavigate("appointment", serviceName);
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" /> Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
