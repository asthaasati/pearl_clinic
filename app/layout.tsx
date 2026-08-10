import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pearl Clinic | Pediatric & Pulmonology Super-Specialty",
  description:
    "Pearl Clinic in Vijay Nagar, Jabalpur by Dr. Diksha Asati & Dr. Rahul Asati for pediatric OPD, spirometry, asthma & pulmonology care, vaccination, and online consultation."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
