"use client";

import { motion } from "framer-motion";
import { HeartPulse, Sparkles, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2.5;
      });
    }, 80);

    const autoProceed = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearInterval(timer);
      clearTimeout(autoProceed);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden placeholder-grid">
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Sparkles & Badges */}
      <div className="absolute top-12 left-12 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-sky-400 text-xs tracking-wider uppercase font-semibold">
        <Sparkles className="w-3.5 h-3.5" /> Pediatric & Critical Care
      </div>
      <div className="absolute top-12 right-12 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-emerald-400 text-xs tracking-wider uppercase font-semibold">
        <ShieldCheck className="w-3.5 h-3.5" /> 24/7 Emergency Support
      </div>

      {/* Main Animated Logo Box */}
      <div className="relative flex flex-col items-center max-w-2xl px-4 text-center z-10">
        <div className="relative flex items-center justify-center mb-8">
          {/* Radar expand rings */}
          <div className="absolute w-44 h-44 rounded-full border border-sky-500/30 animate-radar pointer-events-none" />
          <div className="absolute w-56 h-56 rounded-full border border-emerald-500/20 animate-radar pointer-events-none" style={{ animationDelay: "0.8s" }} />

          {/* Ambient Glow behind image */}
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-sky-500/30 via-emerald-500/30 to-amber-400/20 blur-xl animate-pulse" />

          {/* Framer Motion Animated Logo Image */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotateY: -30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 14,
              duration: 1.2
            }}
            className="relative w-40 h-40 md:w-48 md:h-48 drop-shadow-[0_15px_35px_rgba(14,165,233,0.4)]"
          >
            <Image
              src="/logo.png"
              alt="Pearl Clinic Logo"
              fill
              className="object-contain filter drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
              priority
            />
          </motion.div>
        </div>

        {/* Title & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-widest">
            <HeartPulse className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> Vijay Nagar, Jabalpur
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight shimmer-text mb-2">
            PEARL CLINIC
          </h1>
          <p className="text-base md:text-lg text-slate-300 font-medium mb-1">
            Pediatric, Critical Care & Pulmonology Center
          </p>
          <div className="text-[11px] sm:text-xs md:text-sm text-slate-400 font-medium mb-8 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center max-w-full px-2 leading-snug">
            <span>Dr. Diksha Asati (MBBS, MD Pediatrics)</span>
            <span className="hidden sm:inline text-sky-400 font-semibold">•</span>
            <span>Dr. Rahul Asati (MBBS, MD Pulmonologist)</span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full max-w-sm flex flex-col items-center gap-4"
        >
          <div className="w-full bg-slate-900/80 rounded-full h-2.5 p-0.5 border border-slate-800 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(14,165,233,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="w-full flex items-center justify-between text-xs text-slate-400 font-medium px-1">
            <span>Loading Clinical Suite...</span>
            <span className="text-sky-400 font-semibold">{Math.round(progress)}%</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Tagline */}
      <div className="absolute bottom-6 text-xs text-slate-500 font-medium">
        Advanced Care for Every Little Smile
      </div>
    </div>
  );
}
