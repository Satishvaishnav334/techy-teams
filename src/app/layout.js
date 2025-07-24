import "./globals.css";



export const metadata = {
  title: "Techysquad Teams",
  description: "Created By Techysquad Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
