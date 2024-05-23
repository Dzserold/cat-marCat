import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} gap-3 flex flex-col justify-between min-h-screen px-3 mx-auto max-w-7xl bg-pink-300 text-blue-950 font-medium`}
      >
        <div className="flex flex-col gap-2">
          <Nav />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}