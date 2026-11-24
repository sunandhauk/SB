import type { Metadata } from "next";
import "./globals.css";
import IntroSplash from "@/components/IntroSplash";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://stackbros.work"),
  title: "StackBros — Independent Software & AI Automation Studio",
  description:
    "We build custom websites, software, and AI workflows around the way your team works. Big ideas. Built to click.",
  keywords: [
    "StackBros",
    "Software Studio",
    "AI Automation",
    "Web Development",
    "Custom Apps",
    "Workflow Automation",
    "Digital Products",
  ],
  authors: [{ name: "StackBros Studio", url: "https://stackbros.work" }],
  creator: "StackBros",
  publisher: "StackBros",
  icons: {
    icon: [
      { url: "/images/stackbros-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/images/stackbros-icon-512.png",
    apple: "/images/stackbros-icon-512.png",
  },
  openGraph: {
    title: "StackBros — Independent Software & AI Automation Studio",
    description:
      "Websites, custom apps and AI workflows built around your business. Big ideas. Built to click.",
    url: "https://stackbros.work",
    siteName: "StackBros",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "StackBros Studio — Big ideas. Built to click.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackBros — Independent Software & AI Automation Studio",
    description:
      "Websites, custom apps and AI workflows built around your business. Big ideas. Built to click.",
    images: ["/images/og-preview.png"],
    creator: "@stackbros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#181B46] text-[#FAF5EF] font-manrope">
        {children}
        <FloatingWhatsApp />
        <IntroSplash />
      </body>
    </html>
  );
}
