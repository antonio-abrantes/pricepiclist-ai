"use client"

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/shopping-list'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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
          <span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span>
          <span className="mx-2">•</span>
          <span>{product.quantidade}x</span>
        </div>
        <p className="text-sm">Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.total)}</p>
      </div>

      <AlertDialog key={product.id}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este produto da lista?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(product.id)}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}