import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David - Product Blueprint Generator",
  description:
    "A desktop-first product blueprint generator for AI indie builders: Bet, IA, flow, low-fi wireframe, scope, and handoff."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
