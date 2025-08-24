import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#59006c",
};

export const metadata: Metadata = {
  title: "Stacker - Manage your work and be productive.",
  description: "Manage your work and be productive with Stacker.",
  keywords: ["Stacker"],
  icons: {
    icon: "/seo/favicon.ico",
    apple: "/seo/apple-touch-icon.png",
    shortcut: "/seo/shortcut.png",
  },
  authors: [
    { name: "DevHannan", url: "https://github.com/DevHannan-Official" },
  ],
  openGraph: {
    title: "Stacker - Manage your work and be productive.",
    description: "Manage your work and be productive with Stacker.",
    url: "https://stacker-productive.vercel.app",
    siteName: "Stacker",
    images: [
      {
        url: "/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stacker Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacker - Manage your work and be productive.",
    description: "Manage your work and be productive with Stacker.",
    images: ["/seo/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  metadataBase: new URL("https://stacker-productive.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
