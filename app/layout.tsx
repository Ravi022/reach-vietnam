import type { Metadata } from "next";
import "./globals.css";
import NavigationWarmup from "./components/NavigationWarmup";

export const metadata: Metadata = {
  title: "Reach Vietnam Company Limited | Natural Origins. Global Possibilities.",
  description: "Explore charcoal, biomass fuels, fruits and spices with Reach Vietnam Company Limited.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}<NavigationWarmup/></body>
    </html>
  );
}
