import { Footer } from "@/components/shared/footer";
import MenuTop from "@/components/shared/menu-top";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { TRPCProvider } from "./trpc/client";
import { HydrateClient } from "./trpc/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "T3 Chill Stack - Ship products faster",
  description: "Welcome to the T3 Chill Stack",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TRPCProvider>
            <HydrateClient>
              <MenuTop />
              <main>{children}</main>
              <Footer />
            </HydrateClient>
          </TRPCProvider>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
