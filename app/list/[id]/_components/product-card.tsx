"use client"

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/shopping-list'

interface ProductCardProps {
  product: Product
  onDelete: (id: string) => void
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="space-y-1">
        <h3 className="font-medium">{product.productName}</h3>
        <div className="text-sm text-muted-foreground">
          <span>R$ {product.price.toFixed(2)}</span>
          <span className="mx-2">•</span>
          <span>{product.quantidade}x</span>
        </div>
        <p className="text-sm">Total: R$ {product.total.toFixed(2)}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onDelete(product.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}