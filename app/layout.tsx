"use client";

import "./globals.css";
import { useState } from "react";
import { Inter } from "next/font/google";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingListHeader } from "@/components/shopping-list/header";
import { Sidebar } from "@/components/shopping-list/sidebar";
import { ShoppingListProvider } from "@/contexts/shopping-list-context";
import { AISettingsProvider } from "@/contexts/ai-settings-context";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gray-50">
            <AISettingsProvider>
              <ShoppingListProvider>
                <div className="min-h-screen bg-gray-50">
                  <ShoppingListHeader>
                    <div className="flex items-center gap-2">
                      <ModeToggle/>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                      >
                        <MenuIcon className="h-6 w-6" />
                      </Button>
                    </div>
                  </ShoppingListHeader>

                  <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                  {children}
                </div>
              </ShoppingListProvider>
            </AISettingsProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}