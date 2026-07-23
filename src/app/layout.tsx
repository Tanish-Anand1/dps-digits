import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import BackgroundEffects from "@/components/BackgroundEffects";
import PageLoader from "@/components/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DPS Digits | Premier Tech Club | DPS Azaad Nagar Kanpur",
  description:
    "The official technology & computational engineering enclave of Delhi Public School Azaad Nagar, Kanpur. We build AI systems, hardware, cybersecurity tools, and web platforms.",
  keywords: [
    "DPS Digits",
    "DPS Azaad Nagar Kanpur",
    "Delhi Public School Kanpur",
    "Tech Club Kanpur",
    "Best Computer Club India",
    "Student AI Enclave",
    "School Hackathon India",
  ],
  authors: [{ name: "DPS Digits Tech Executive Board" }],
  openGraph: {
    title: "DPS Digits | Billion-Dollar Tech Enclave",
    description:
      "Official Technology Society of Delhi Public School Azaad Nagar, Kanpur. AI, Robotics, Cybersecurity, CP, Full-Stack.",
    url: "https://dpsdigits.org",
    siteName: "DPS Digits",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DPS Digits | DPS Azaad Nagar Kanpur",
    description:
      "Pioneering student technology enclave at Delhi Public School Azaad Nagar, Kanpur.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "DPS Digits",
              url: "https://dpsdigits.org",
              parentOrganization: {
                "@type": "School",
                name: "Delhi Public School Azaad Nagar",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Kanpur",
                  addressRegion: "Uttar Pradesh",
                  addressCountry: "IN",
                },
              },
              description:
                "Premier student technology society specializing in AI, competitive coding, robotics, cybersecurity, and web software.",
            }),
          }}
        />
      </head>
      <body className="relative bg-black text-white antialiased min-h-screen selection:bg-emerald-700 selection:text-white">
        <PageLoader />
        <BackgroundEffects />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
