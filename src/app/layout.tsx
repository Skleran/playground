import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { SquircleNoScript } from "@squircle-js/react";
import { ViewTransitions } from "next-view-transitions";
import { ViewTransitionProvider } from "@/utils/useViewTransitionActive";

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

const neueHaasDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-15XXThin-Trial.otf",
      weight: "150",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-25XThin-Trial.otf",
      weight: "250",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-35Thin-Trial.otf",
      weight: "350",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-45Light-Trial.otf",
      weight: "450",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-55Roman-Trial.otf",
      weight: "550",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-65Medium-Trial.otf",
      weight: "650",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-75Bold-Trial.otf",
      weight: "750",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-haas-display/NeueHaasGrotDisp-95Black-Trial.otf",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas-display",
});

export const metadata: Metadata = {
  title: "Erdem Koyuncu",
  description: "UI/Frontend playground by Skleran",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${space_mono.variable} ${inter.className} ${neueMachina.variable} ${neueMachinaInktrap.variable} ${neueHaasDisplay.variable} antialiased min-h-[100svh] leading-relaxed`}
        >
          <ViewTransitionProvider>
            <NextIntlClientProvider messages={messages}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SquircleNoScript />
                {children}
              </ThemeProvider>
            </NextIntlClientProvider>
          </ViewTransitionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
