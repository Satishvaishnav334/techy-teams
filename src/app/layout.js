
import "./globals.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { UserDataProvider } from "@/components/context/UserContext";

export const metadata = {
  title: "Techysquad Teams",
  description: "Created By Techysquad Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <UserDataProvider>
          <Navbar />
          {children}
          <Footer />
        </UserDataProvider>
      </body>
    </html>
  );
}
