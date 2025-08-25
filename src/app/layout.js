
import "./globals.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { LoadingProvider } from "@/components/context/LoadingContext";
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
  },
  title: "Techysquad Teams",
  description: "Created By Techysquad Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          <LoadingProvider>
            <Navbar />
            {children}
            < Footer />
          </LoadingProvider>
        </main>
        <Toaster position="top-right" richColors></Toaster>
      </body>
    </html >
  );
}




