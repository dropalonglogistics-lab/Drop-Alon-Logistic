import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileWrapper from "@/components/layout/MobileWrapper";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drop Along Logistic | PH Port Harcourt Transport",
  description: "Advanced public transport routing for Port Harcourt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dal-grey`}>
        <MobileWrapper>
          {children}
          <Navbar />
        </MobileWrapper>
      </body>
    </html>
  );
}