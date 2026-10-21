import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Full-range IL and a range check',
  description: 'Full-range impermanent loss at a price ratio, and whether that ratio sits in a symmetric band. Not concentrated liquidity and not Alcor.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
