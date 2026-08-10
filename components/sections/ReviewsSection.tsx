"use client";

import {
  CheckCircle2,
  ChevronDown,
  Heart,
  MessageSquareQuote,
  Sparkles,
  Star,
  UserCheck
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export interface ReviewItem {
  id: string;
  name: string;
  category:
    | "General Pediatric & Emergency Care"
    | "Effective Treatment & Minimal Intervention"
    | "Vaccination & Newborn Care"
    | "Specialized Cases & Complex Health Issues";
  summary: string;
  image?: string;
  location?: string;
  rating: number;
}

export const reviewsData: ReviewItem[] = [
  {
    id: "1",
    name: "Swarna Asati",
    category: "General Pediatric & Emergency Care",
    summary:
      "Highly recommends Pearl Clinic for its proper day-care unit, modern vaccination setup, and child-friendly play space. Praises Dr. Diksha as gentle, experienced, and dedicated.",
    image: "/reviews/swarna_asati.png",
    rating: 5
  },
  {
    id: "2",
    name: "Vinay Anand",
    category: "General Pediatric & Emergency Care",
    summary:
      "Expresses deep gratitude for treating their child with immense love and care, emphasizing her round-the-clock availability during critical times.",
    rating: 5
  },
  {
    id: "3",
    name: "Dr. Aditya Dubey",
    category: "General Pediatric & Emergency Care",
    summary:
      "Highlights her clinical excellence in Pediatric Critical Care combined with a compassionate, reassuring bedside manner.",
    rating: 5
  },
  {
    id: "4",
    name: "Vikas Sharma",
    category: "Effective Treatment & Minimal Intervention",
    summary:
      "Appreciated that Dr. Asati focused on minimal, targeted medication rather than running unnecessary tests or over-prescribing—his son felt better after the first dose.",
    rating: 5
  },
  {
    id: "5",
    name: "Ankit Kapoor",
    category: "Effective Treatment & Minimal Intervention",
    summary:
      "Noted her quick diagnosis and effective treatment for a severe stomach infection.",
    rating: 5
  },
  {
    id: "6",
    name: "Priyanka Choudhary",
    category: "Effective Treatment & Minimal Intervention",
    summary:
      "Shared that her baby recovered completely from vomiting and loose motion under Dr. Asati's care.",
    rating: 5
  },
  {
    id: "7",
    name: "Abhishek Kouraw",
    category: "Vaccination & Newborn Care",
    summary:
      "Excellent experience with routine child vaccinations; noted clean facilities and polite staff.",
    rating: 5
  },
  {
    id: "8",
    name: "Pooja Bharti",
    category: "Vaccination & Newborn Care",
    summary:
      "Thanked Dr. Asati for successful newborn care during a bout of neonatal jaundice and smooth vaccination handling.",
    rating: 5
  },
  {
    id: "9",
    name: "Shweta Sharma",
    category: "Vaccination & Newborn Care",
    summary:
      "Appreciates her focus on natural baby growth and strong developmental guidance.",
    rating: 5
  },
  {
    id: "10",
    name: "Jeetendra Yadav",
    category: "Specialized Cases & Complex Health Issues",
    summary:
      "Successfully treated their child for hepatitis and high fever with clear, patient explanations throughout.",
    rating: 5
  },
  {
    id: "11",
    name: "Amit Prajapati & Aman Yadav",
    category: "Specialized Cases & Complex Health Issues",
    summary:
      "Both commended her precise diagnosis and care for children suffering from typhoid fever.",
    image: "/reviews/aman_yadav.png",
    rating: 5
  },
  {
    id: "12",
    name: "Satish Choudhary",
    category: "Specialized Cases & Complex Health Issues",
    summary:
      "Traveled from Hoshangabad for specialized pediatric care regarding low platelet counts and severe illness.",
    location: "Hoshangabad",
    rating: 5
  }
];

const categories = [
  "All Categories",
  "General Pediatric & Emergency Care",
  "Effective Treatment & Minimal Intervention",
  "Vaccination & Newborn Care",
  "Specialized Cases & Complex Health Issues"
] as const;

export function ReviewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setShowAll(false);
  };

  const filteredReviews = useMemo(() => {
    if (selectedCategory === "All Categories") return reviewsData;
    return reviewsData.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const visibleReviews = useMemo(() => {
    if (showAll) return filteredReviews;
    return filteredReviews.slice(0, 3);
  }, [filteredReviews, showAll]);

  return (
    <section className="space-y-8 py-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Patient Feedback & Testimonials
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">What Patient Say</h2>
          <p className="text-xs md:text-sm text-slate-400 whitespace-nowrap">
            Real stories and verified experiences from families cared for by Dr. Diksha Asati & Dr. Rahul Asati.
          </p>
        </div>

        {/* Rating Summary Badge */}
        <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shrink-0">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="text-xs">
            <span className="font-extrabold text-white text-sm">4.9 / 5.0</span>
            <span className="text-slate-400 block text-[11px]">Verified Patient Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-lg shadow-sky-500/20 font-bold"
                  : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="group relative rounded-2xl p-6 glass-card border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-4">
              {/* Category Tag & Rating Stars */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20 line-clamp-1">
                  {review.category}
                </span>
                <div className="flex items-center text-amber-400 shrink-0">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote Icon & Summary */}
              <div className="relative pt-1">
                <MessageSquareQuote className="w-6 h-6 text-slate-700 mb-2 group-hover:text-sky-400/40 transition-colors" />
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  &ldquo;{review.summary}&rdquo;
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {review.image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-sky-500/40 shrink-0 bg-slate-900">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500/20 to-emerald-500/20 border border-sky-500/30 text-sky-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {review.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {review.location ? `Patient from ${review.location}` : "Verified Parent"}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View More / Show Less Toggle Button */}
      {filteredReviews.length > 3 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-sky-500/60 text-sky-400 hover:text-white font-bold text-xs shadow-xl transition-all flex items-center gap-2 cursor-pointer group"
          >
            <span>
              {showAll ? "Show Less Reviews" : "View More Reviews"}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </section>
  );
}
