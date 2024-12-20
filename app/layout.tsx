import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "@/components/theme-provider";
import { AIProviderProvider } from "@/contexts/ai-provider-context";
import { ShoppingListProvider } from "@/contexts/shopping-list-context";
import { ProfileProvider } from "@/contexts/profile-context";
import { Toaster } from "sonner";
import { RootLayoutClient } from "./components/root-layout-client";
import { PWAInstallProvider } from "@/contexts/pwa-install-context";

const inter = Inter({ subsets: ["latin"] });
const title = "PricePicList.AI";
const description =
  "Uma aplicação web inteligente para gerenciar listas de compras, usando IA para extrair informações de produtos a partir de fotos.";
const url = "https://pricepiclist-ai.vercel.app/";
const ogimage =
  "https://storage.tonilab.net/api/v1/buckets/assets/objects/download?preview=true&prefix=pricepiclist-ai.jpg";
const sitename = "pricepiclist-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-512x512.png",
    shortcut: "/icon-192x192.png",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: title,
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#000000",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain="infoextract.ai.tonilab.net" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PWAInstallProvider>
            <ProfileProvider>
              <AIProviderProvider>
                <ShoppingListProvider>
                  <RootLayoutClient>{children}</RootLayoutClient>
                </ShoppingListProvider>
              </AIProviderProvider>
            </ProfileProvider>
          </PWAInstallProvider>
          <Toaster position="top-right" richColors expand={true} offset={8} />
        </ThemeProvider>
      </body>
    </html>
  );
}
