import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto India Spare Parts",
  description: "Premium automobile spare parts across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
