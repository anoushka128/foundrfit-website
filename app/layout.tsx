import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoundrFit",
  description: "FoundrFit helps serious founders find the right co-founder faster with AI-powered matching.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
