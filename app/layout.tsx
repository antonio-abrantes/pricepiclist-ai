"use client";

import "./globals.css";
import { useState } from "react";
import { Inter } from "next/font/google";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingListHeader } from "@/components/shopping-list/header";
import { Sidebar } from "@/components/shopping-list/sidebar";
import { ShoppingListProvider } from "@/contexts/shopping-list-context";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { AIProviderProvider } from "@/contexts/ai-provider-context";
import { Toaster } from 'sonner';
import { ProfileProvider } from '@/contexts/profile-context';

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
          <ProfileProvider>
            <AIProviderProvider>
              <ShoppingListProvider>
                <div className="min-h-screen bg-background">
                  <ShoppingListHeader>
                    <div className="flex items-center gap-1">
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
            </AIProviderProvider>
          </ProfileProvider>
          <Toaster 
            position="top-right"
            richColors 
            expand={true}  // Faz os toasts expandirem verticalmente
            offset={8}     // Espaçamento entre os toasts
          />
        </ThemeProvider>
      </body>
    </html>
  );
}