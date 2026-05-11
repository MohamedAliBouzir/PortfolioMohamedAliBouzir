import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/provider/theme-provider";
import PageWrapper from "@/components/layout/PageWrapper";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohamed Ali Bouzir — Full-Stack JS Engineer",
  description:
    "Full-Stack JS Engineer specializing in React, Next.js, and Node.js. Building high-performance web applications with pixel-perfect UIs and scalable backends.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Tunisia"],
  authors: [{ name: "Mohamed Ali Bouzir" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistMono.variable} ${caveat.variable} antialiased cursor-none`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
            <Header />
          </div>
          <PageWrapper>{children}</PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
