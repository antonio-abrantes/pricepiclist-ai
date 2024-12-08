import { ShoppingBag } from "lucide-react";
import Link from "next/link";

/**
 * Esta aplicação é um projeto pessoal para ajudar na leitura de preços em supermercados através de imagens de etiquetas e cartazes que
 * são enviados pelo usuário para uma Inteligencia Artificial e analisados para que ela possa extrair os dados dos produtos e adicionar à lista de compras.
 */

export function ShoppingListHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          <Link href="/">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PricePicList.AI</span>
            </div>
          </Link>

          {children}
        </div>
      </div>
    </header>
  );
}