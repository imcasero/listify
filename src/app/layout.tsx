import "./globals.css";
import { Work_Sans } from "next/font/google";
import { ThemeProvider } from "@/context/Theme/ThemeContext";

const work_sans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`antialiased ${work_sans.className}`}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
