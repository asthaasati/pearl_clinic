"use client";

import { API_BASE_URL } from "@/lib/api";

import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Headset,
  HeartPulse,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Smartphone,
  Stethoscope,
  UserCheck
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface AppointmentScreenProps {
  initialService?: string;
  onNavigate: (screenId: string) => void;
}

const ALL_CLINICAL_SERVICES = [
  {
    title: "Pediatric General OPD",
    desc: "Routine pediatric consultations, growth tracking, fever, cold & nutrition guidance",
    doc: "Dr. Diksha Asati"
  },
  {
    title: "Routine & Catch-Up Vaccination",
    desc: "Complete IAP immunization schedule with cold-chain maintenance & catch-up doses",
    doc: "Dr. Diksha Asati"
  },
  {
    title: "PICU & NICU Hospital Admissions",
    desc: "Emergency coordination & critical care management for severe pediatric illnesses",
    doc: "Dr. Diksha Asati"
  },
  {
    title: "Growth & Development Assessment",
    desc: "Child growth milestone tracking, nutritional status & developmental screening",
    doc: "Dr. Diksha Asati"
  },
  {
    title: "Spirometry & Lung Function Testing (PFT)",
    desc: "Computerized diagnostic lung volume & airflow capacity measurement",
    doc: "Dr. Rahul Asati"
  },
  {
    title: "Chronic Cough & Respiratory Allergy Clinic",
    desc: "Evaluation for persistent cough, allergic rhinitis, post-nasal drip & hyperreactive airways",
    doc: "Dr. Rahul Asati"
  },
  {
    title: "Sleep & Respiratory Disorders Clinic",
    desc: "Care for nocturnal breathlessness, sleep apnea, snoring & chronic hypoxia",
    doc: "Dr. Rahul Asati"
  },
  {
    title: "Bronchoscopy",
    desc: "Diagnostic & therapeutic airway endoscopy for foreign body, stridor & airway evaluation",
    doc: "Dr. Rahul / Dr. Diksha"
  },
  {
    title: "Asthma & COPD Care Clinic",
    desc: "Comprehensive treatment for bronchial asthma, COPD, chest tightness & wheezing",
    doc: "Dr. Rahul / Dr. Diksha"
  },
  {
    title: "Nebulization & Inhalation Therapy",
    desc: "Supervised aerosolized bronchodilator therapy for acute bronchospasm & breathlessness",
    doc: "Dr. Rahul / Dr. Diksha"
  },
  {
    title: "Online Video Consultation",
    desc: "Virtual OPD consultation from the comfort of your home",
    doc: "Dr. Diksha / Dr. Rahul"
  }
];

export function AppointmentScreen({ initialService, onNavigate }: AppointmentScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const initialDoctor = useMemo(() => {
    if (initialService) {
      const match = ALL_CLINICAL_SERVICES.find((s) => s.title.toLowerCase().includes(initialService.toLowerCase()) || initialService.toLowerCase().includes(s.title.toLowerCase()));
      if (match && match.doc.includes("Rahul") && !match.doc.includes("Diksha")) {
        return "Dr. Rahul Asati (Pulmonologist)";
      }
    }
    return "Dr. Diksha Asati (Pediatrician)";
  }, [initialService]);

  const [formData, setFormData] = useState({
    doctor: initialDoctor,
    service: initialService || "Pediatric General OPD",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "10:00 AM",
    patientName: "",
    patientAge: "",
    phone: "",
    notes: ""
  });

  const filteredServices = useMemo(() => {
    const isRahul = formData.doctor.includes("Rahul");
    return ALL_CLINICAL_SERVICES.filter((svc) =>
      isRahul ? svc.doc.includes("Rahul") : svc.doc.includes("Diksha")
    );
  }, [formData.doctor]);

  const handleDoctorSelect = (doctorName: string) => {
    const isRahul = doctorName.includes("Rahul");
    const doctorServices = ALL_CLINICAL_SERVICES.filter((svc) =>
      isRahul ? svc.doc.includes("Rahul") : svc.doc.includes("Diksha")
    );
    const isCurrentValid = doctorServices.some((svc) => svc.title === formData.service);

    setFormData((prev) => ({
      ...prev,
      doctor: doctorName,
      service: isCurrentValid ? prev.service : doctorServices[0].title
    }));
  };

  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:15 AM",
    "12:00 PM",
    "01:00 PM",
    "05:15 PM",
    "06:00 PM",
    "07:00 PM"
  ];

  // Storage key for per-date per-doctor slot locking
  const storageKey = useMemo(() => {
    return `booked_slots_${formData.date}_${formData.doctor.replace(/[^a-zA-Z]/g, "")}`;
  }, [formData.date, formData.doctor]);

  // Fetch booked slots to enforce no overlap
  useEffect(() => {
    const fetchSlots = async () => {
      let localBooked: string[] = [];
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          localBooked = JSON.parse(stored);
        }
      } catch (e) {
        console.error("Local storage parse error:", e);
      }

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/appointments/booked-slots?date=${encodeURIComponent(
            formData.date
          )}&doctor=${encodeURIComponent(formData.doctor)}`
        );
        if (res.ok) {
          const data = await res.json();
          const combined = Array.from(new Set([...localBooked, ...(data.bookedSlots || [])]));
          setBookedSlots(combined);
          return;
        }
      } catch (err) {
        console.log("Backend offline or unreachable, using local storage slot state", err);
      }

      setBookedSlots(localBooked);
    };

    fetchSlots();
  }, [formData.date, formData.doctor, storageKey]);

  // Handle slot selection (disables booked slots)
  const handleSelectSlot = (slot: string) => {
    if (bookedSlots.includes(slot)) {
      setBookingError(`The slot ${slot} on ${formData.date} is already booked. Please choose another time slot.`);
      return;
    }
    setBookingError(null);
    setFormData({ ...formData, timeSlot: slot });
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (bookedSlots.includes(formData.timeSlot)) {
      setBookingError(`Appointment slot ${formData.timeSlot} is already booked for this doctor on ${formData.date}.`);
      return;
    }

    setIsSubmitting(true);
    const generatedId = "PC-" + Math.floor(100000 + Math.random() * 900000);

    const updatedBooked = Array.from(new Set([...bookedSlots, formData.timeSlot]));
    setBookedSlots(updatedBooked);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedBooked));
    } catch (e) {
      console.error(e);
    }

    try {
      await fetch(`${API_BASE_URL}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor: formData.doctor,
          service: formData.service,
          patientName: formData.patientName,
          patientAge: formData.patientAge,
          phone: formData.phone,
          date: formData.date,
          timeSlot: formData.timeSlot,
          notes: formData.notes
        })
      });
    } catch (err) {
      console.log("Backend post skipped or saved locally", err);
    }

    setAppointmentId(generatedId);
    setIsSubmitting(false);
    setStep(4);
  };

  // Format shareable message text in IST (Indian Standard Time, UTC+5:30)
  const getShareMessageText = () => {
    return `🏥 PEARL CLINIC APPOINTMENT CONFIRMATION
Pass Code: ${appointmentId}

👨‍⚕️ DOCTOR DETAILS:
Doctor: ${formData.doctor}
Service: ${formData.service}

📅 APPOINTMENT SCHEDULE (IST - Indian Standard Time):
Date: ${formData.date}
Time Slot: ${formData.timeSlot} IST
Timezone: Asia/Kolkata (IST, UTC+5:30)
⏰ Alarm: 10-Minute Reminder set before schedule

👤 PATIENT DETAILS:
Patient Name: ${formData.patientName}
Patient Age/DOB: ${formData.patientAge}
Patient Phone: ${formData.phone}
Notes/Symptoms: ${formData.notes || "N/A"}

📍 CLINIC LOCATION:
Pearl Clinic, Kachanr City Road, Opposite Children Book House, Vijay Nagar, Jabalpur, MP 482002
Clinic Helpline: +91 9981342401
Clinic Email: pearlclinic.jbp@gmail.com`;
  };



  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Top Navigation Back Button */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => onNavigate("home")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" /> Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <div className="text-center space-y-2 print:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <CalendarCheck className="w-3.5 h-3.5" /> OPD Booking & IST Schedule Sync
        </div>
        <h1 className="text-3xl font-black text-white">Book Doctor Appointment</h1>
        <p className="text-slate-300 text-sm">
          Schedule consultation with Dr. Diksha Asati (Pediatrics) or Dr. Rahul Asati (Pulmonology). All timings in IST (Indian Standard Time).
        </p>
      </div>

      {/* Progress Bar Indicator */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between print:hidden">
        {[
          { num: 1, label: "Doctor & Service" },
          { num: 2, label: "Date & Slot (IST)" },
          { num: 3, label: "Patient Details" },
          { num: 4, label: "Pass & Reminders" }
        ].map((item) => (
          <div key={item.num} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === item.num
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                  : step > item.num
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-900 text-slate-500 border border-slate-800"
              }`}
            >
              {step > item.num ? <CheckCircle2 className="w-4 h-4" /> : item.num}
            </div>
            <span
              className={`text-xs font-medium hidden sm:inline ${
                step === item.num ? "text-sky-400 font-bold" : "text-slate-400"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Wizard Form Container */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-800 print:bg-transparent print:p-0 print:border-none">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Step 1: Select Consultant & Service</h2>

              {/* Doctor Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Dr. Diksha Asati (Pediatrician)", tag: "Pediatrics & PICU / NICU", icon: "👶" },
                  { name: "Dr. Rahul Asati (Pulmonologist)", tag: "Pulmonology, PFT & Asthma Care", icon: "🫁" }
                ].map((doc) => (
                  <div
                    key={doc.name}
                    onClick={() => handleDoctorSelect(doc.name)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      formData.doctor === doc.name
                        ? "bg-sky-500/15 border-sky-500 text-white shadow-md shadow-sky-500/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-2xl">{doc.icon}</div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{doc.name}</h3>
                      <p className="text-xs text-sky-400 font-medium">{doc.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Clinical Service Required
                </label>
                <span className="text-xs text-sky-400 font-medium">
                  Showing services for {formData.doctor.split(" ")[1]} {formData.doctor.split(" ")[2]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredServices.map((svc) => (
                  <div
                    key={svc.title}
                    onClick={() => setFormData({ ...formData, service: svc.title })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.service === svc.title
                        ? "bg-sky-500/10 border-sky-500 text-white shadow-md shadow-sky-500/10"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-xs text-white">{svc.title}</h3>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium shrink-0">
                        {svc.doc}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{svc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center gap-1 cursor-pointer"
              >
                Next Step: Select Date & Slot (IST) <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-bold text-white">Step 2: Pick Date & Time Slot (IST - Indian Standard Time)</h2>
              <span className="text-xs text-sky-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Overlap Prevention Active
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Select Preferred Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={(e) => {
                    setBookingError(null);
                    setFormData({ ...formData, date: e.target.value });
                  }}
                  className="w-full max-w-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-sky-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-400">Available Time Slots (IST / UTC+5:30)</label>
                  <span className="text-[11px] text-slate-500">
                    {bookedSlots.length > 0
                      ? `${bookedSlots.length} slot(s) already booked on this date`
                      : "All slots available"}
                  </span>
                </div>

                {bookingError && (
                  <div className="p-3 mb-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {bookingError}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = formData.timeSlot === slot && !isBooked;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => handleSelectSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all relative flex flex-col items-center justify-center gap-0.5 ${
                          isBooked
                            ? "bg-slate-950/80 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 cursor-pointer"
                        }`}
                      >
                        <span>{slot} IST</span>
                        {isBooked && (
                          <span className="text-[9px] font-bold text-rose-400 uppercase tracking-tighter no-underline">
                            Booked / Unavailable
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Back
              </button>
              <button
                disabled={bookedSlots.includes(formData.timeSlot)}
                onClick={() => {
                  if (bookedSlots.includes(formData.timeSlot)) {
                    setBookingError("Please select an available time slot before continuing.");
                    return;
                  }
                  setStep(3);
                }}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1 cursor-pointer ${
                  bookedSlots.includes(formData.timeSlot)
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/25"
                }`}
              >
                Next Step: Patient Info <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleBook} className="space-y-6">
            <h2 className="text-xl font-bold text-white">Step 3: Patient Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full patient name"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Patient Age / Birthdate *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 25 Years or 3 Years 2 Months"
                  value={formData.patientAge}
                  onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-sky-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Patient Mobile Phone Number (For WhatsApp & SMS) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9981342401"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Symptoms / Notes (Optional)</label>
              <textarea
                rows={3}
                placeholder="Describe duration, fever, cough severity, or specific concerns..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-sky-500"
              />
            </div>

            {bookingError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {bookingError}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white text-xs font-bold shadow-xl shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Reserving Slot...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Confirm
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: PRINTABLE CONFIRMATION RECEIPT TEMPLATE (Matching appointment confirmation receipt.png) */}
        {step === 4 && (
          <div className="space-y-6">
            {/* HIGHLIGHTED POP-UP / ALERT CALLOUT FOR DISPATCHING APPOINTMENT & SCREENSHOT REQUIREMENT */}
            <div className="space-y-3 print:hidden">
              {/* Dispatch Action Prompt */}
              <div className="p-4 rounded-2xl bg-sky-50/90 dark:bg-sky-950/40 border-2 border-sky-500 shadow-xl space-y-2 text-left">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-black text-sm uppercase tracking-wide">
                  <AlertCircle className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>ACTION REQUIRED: CLICK BUTTONS BELOW TO SEND APPOINTMENT PASS</span>
                </div>
                <p className="text-xs text-slate-900 dark:text-slate-100 font-bold leading-relaxed">
                  Your appointment slot is reserved! <strong className="text-sky-600 dark:text-sky-400 underline font-black">Please click on the WhatsApp, SMS, or Email buttons below</strong> to immediately dispatch and send your booked appointment details to Doctor Desk & Patient phone!
                </p>
              </div>

              {/* Receipt Screenshot / Print Warning */}
              <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/30 border-2 border-sky-400/80 shadow-md flex items-start gap-3 text-left">
                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    📌 MANDATORY CLINIC VISIT INSTRUCTION
                  </h4>
                  <p className="text-xs text-slate-900 dark:text-slate-100 font-bold leading-relaxed">
                    Please bring a <span className="bg-sky-600 text-white keep-text-white px-2 py-0.5 rounded font-extrabold shadow-sm">Screenshot</span> or <span className="bg-sky-700 text-white keep-text-white px-2 py-0.5 rounded font-extrabold shadow-sm">Printed Copy</span> of this Appointment Confirmation Pass when visiting Pearl Clinic.
                  </p>
                </div>
              </div>
            </div>

            {/* PRINTABLE CARD CONTAINER */}
            <div id="printable-receipt" className="max-w-2xl mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
              {/* Top Dark Header */}
              <div className="receipt-dark-header bg-[#0b1329] p-6 text-center space-y-2 border-b border-slate-800">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-sky-400" />
                  <h2 className="text-2xl font-black text-white keep-text-white uppercase tracking-wider">APPOINTMENT CONFIRMED!</h2>
                  <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-sky-400" />
                </div>

                <p className="text-xs text-sky-400 font-semibold">
                  Pass Code: <span className="font-extrabold text-white keep-text-white">{appointmentId}</span>{" "}
                  <span className="text-emerald-400 font-bold">(Slot Locked in IST)</span>
                </p>
              </div>

              {/* Main White Receipt Card */}
              <div className="p-6 md:p-8 bg-white text-slate-900 space-y-6">
                {/* Receipt Title Header */}
                <div className="border-b border-slate-200 pb-4">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">PEARL CLINIC APPOINTMENT PASS</h1>
                  <p className="text-xs font-semibold text-sky-600 mt-0.5">IST Timezone & 10-Min Alarm Sync</p>
                  <div className="w-10 h-1 bg-emerald-500 rounded-full mt-2" />
                </div>

                {/* Details Grid (2 Columns with dashed dividers) */}
                <div className="space-y-4 text-xs">
                  {/* Row 1: Doctor & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-dashed border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DOCTOR</span>
                        <span className="font-extrabold text-slate-900 text-sm">{formData.doctor}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SERVICE</span>
                        <span className="font-extrabold text-slate-900 text-sm">{formData.service}</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Date & Time (IST) & Patient Name & Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-dashed border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DATE & TIME (IST)</span>
                        <span className="font-extrabold text-emerald-600 text-sm">
                          {formData.date} at {formData.timeSlot} IST
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PATIENT NAME & AGE</span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {formData.patientName || "Patient"} ({formData.patientAge})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Patient Phone & Clinic Contact & Mail */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PATIENT PHONE</span>
                        <span className="font-extrabold text-slate-900 text-sm">{formData.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CLINIC CONTACT & MAIL</span>
                        <span className="font-extrabold text-slate-900 text-xs">9981342401 / pearlclinic.jbp@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clinic Location Pill */}
                <a
                  href="https://maps.app.goo.gl/aUikgA6Swf9QxvSUA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-2 hover:border-sky-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pearl Clinic, Scheme No 54, Vijay Nagar, Jabalpur, MP 482002 📍</span>
                </a>

                {/* Important Notes Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-left space-y-2 text-xs">
                  <h4 className="font-extrabold text-emerald-800 uppercase tracking-wider text-[11px]">IMPORTANT NOTES</h4>
                  <ul className="space-y-1.5 text-slate-700 text-[11px] leading-relaxed">
                    <li>• 📸 <strong>MANDATORY:</strong> Please bring a screenshot or printout of this appointment confirmation receipt when coming to Pearl Clinic.</li>
                    <li>• Please arrive 5-10 minutes prior to your slot time for smooth check-in.</li>
                    <li>• Carry any previous medical reports, prescriptions, or vaccination records if available.</li>
                    <li>• In case you need to reschedule or cancel, please inform clinic desk via WhatsApp or Call.</li>
                  </ul>
                </div>

                {/* Greeting Footer */}
                <div className="pt-2 text-center space-y-1">
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-[1px] flex-1 bg-dashed border-b border-slate-200" />
                    <span className="font-bold text-slate-800 text-xs">Thank you for choosing Pearl Clinic.</span>
                    <div className="h-[1px] flex-1 bg-dashed border-b border-slate-200" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">We look forward to serving you.</p>
                </div>
              </div>

              {/* Bottom Feature Strip (Dark Footer) */}
              <div className="receipt-dark-footer bg-[#070e20] p-4 text-white keep-text-white border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-semibold">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-200 keep-text-slate-200">IST TIMEZONE</span>
                    <span className="text-[9px] text-slate-400 keep-text-slate-300">& 10-Min Alarm Sync</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-200 keep-text-slate-200">YOUR SLOT IS</span>
                    <span className="text-[9px] text-slate-400 keep-text-slate-300">LOCKED & CONFIRMED</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Headset className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-200 keep-text-slate-200">WE ARE HERE TO</span>
                    <span className="text-[9px] text-slate-400 keep-text-slate-300">HELP YOU</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-200 keep-text-slate-200">YOUR HEALTH IS</span>
                    <span className="text-[9px] text-slate-400 keep-text-slate-300">OUR PRIORITY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* INSTANT NOTIFICATION DISPATCH BOX */}
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 space-y-3 text-center print:hidden shadow-lg">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" /> Instant Notification Dispatch (Patient & Doctor Desk)
              </div>
              <p className="text-xs text-slate-200 font-medium">
                Send appointment confirmation pass directly to Patient (+91 {formData.phone}) & Doctor Helpline (+91 9981342401) via WhatsApp, SMS, or Email:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <a
                  href={`https://wa.me/919981342401?text=${encodeURIComponent(getShareMessageText())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white keep-text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Doctor Desk (+91 9981342401)
                </a>
                <a
                  href={`https://wa.me/91${formData.phone.replace(/\D/g, "")}?text=${encodeURIComponent(getShareMessageText())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                >
                  <Smartphone className="w-4 h-4" /> WhatsApp Patient (+91 {formData.phone})
                </a>
                <a
                  href={`sms:+919981342401?body=${encodeURIComponent(getShareMessageText())}`}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white keep-text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                >
                  <Send className="w-4 h-4" /> SMS Doctor (+91 9981342401)
                </a>
                <a
                  href={`mailto:pearlclinic.jbp@gmail.com?subject=${encodeURIComponent(`New Appointment: ${appointmentId} - ${formData.patientName}`)}&body=${encodeURIComponent(getShareMessageText())}`}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white keep-text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 border border-purple-400/40"
                >
                  <Mail className="w-4 h-4 text-white" /> Email Clinic Desk
                </a>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
              <button
                onClick={() => onNavigate("home")}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-800 shadow-md"
              >
                Return to Dashboard
              </button>

              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-xl shadow-emerald-500/25 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <Download className="w-4 h-4" /> Save / Print Pass PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
