"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShoppingListHeader } from "@/components/shopping-list/header";
import { Sidebar } from "@/components/shopping-list/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ShoppingListHeader>
        <div className="flex items-center gap-1">
          <ModeToggle />
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
  );
} 