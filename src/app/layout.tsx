import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Tasks — Day 03",
  description: "Todo app with local storage, built in 100 Days Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}