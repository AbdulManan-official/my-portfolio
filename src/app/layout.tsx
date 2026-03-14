import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdul Manan — Flutter Developer",
  description: "Flutter developer crafting high-performance mobile apps for iOS & Android. Based in Sialkot, Pakistan.",
  keywords: ["Flutter", "mobile developer", "iOS", "Android", "Firebase", "Supabase"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}