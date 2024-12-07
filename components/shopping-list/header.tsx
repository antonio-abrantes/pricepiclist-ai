import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function ShoppingListHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          <Link href="/">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PricePic.AI</span>
            </div>
          </Link>

          {children}
        </div>
      </div>
    </header>
  );
}