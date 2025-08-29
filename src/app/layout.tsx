import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";

const space_mono = Space_Mono({
  variable: "--font-space-mono",
  weight: "700",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const neueMachina = localFont({
  src: [
    {
      path: "../../public/fonts/neue-machina/PPNeueMachina-PlainUltrabold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-machina/PPNeueMachina-PlainRegular.otf",
      weight: "375",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-machina/PPNeueMachina-PlainLight.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-machina",
});

const neueMachinaInktrap = localFont({
  src: [
    {
      path: "../../public/fonts/neue-machina/PPNeueMachina-InktrapUltrabold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-machina/PPNeueMachina-InktrapRegular.otf",
      weight: "375",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-machina/PPNeueMachina-InktrapLight.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-machina-inktrap",
});

export const metadata: Metadata = {
  title: "Playground",
  description: "UI/Frontend playground by Skleran",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${space_mono.variable} ${inter.className} ${neueMachina.variable} ${neueMachinaInktrap.variable} antialiased min-h-[100svh] leading-relaxed`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
