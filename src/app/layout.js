
import "./globals.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { LoadingProvider } from "@/components/context/LoadingContext";
import { Toaster } from "@/components/ui/sonner"
import Notifications from "@/components/Notification";
export const metadata = {
  title: "Techysquad Teams",
  description: "Created By Techysquad Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <LoadingProvider>
            <Notifications></Notifications>
          {children}
          </LoadingProvider>
        </main>
        <Toaster position="top-right" richColors></Toaster>
      </body>
    </html >
  );
}