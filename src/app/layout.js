
import "./globals.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { UserDataProvider } from "@/components/context/UserContext";
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
  title: "Techysquad Teams",
  description: "Created By Techysquad Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
        <Toaster></Toaster>
      </body>
    </html >
  );
}