import { Footer } from "@/components/shared/footer";
import MenuTop from "@/components/shared/menu-top";
import { env } from "@/lib/env";
import { getUser } from "@/lib/supabase/get-user";
import { AuthProvider } from "@/providers/auth-provider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { TRPCProvider } from "./trpc/client";
import { HydrateClient } from "./trpc/server";

const defaultUrl = env.NEXT_PUBLIC_APP_URL;

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

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
              <AuthProvider initialUser={user}>
                <MenuTop />
                <main>{children}</main>
                <Footer />
              </AuthProvider>
            </HydrateClient>
          </TRPCProvider>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
