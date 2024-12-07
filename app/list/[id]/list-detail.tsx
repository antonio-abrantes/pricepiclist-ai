"use client"

import { useList } from '@/contexts/list-context'
import { ListActions } from './_components/list-actions'
import { ProductCard } from './_components/product-card'
import { ListFooter } from './_components/list-footer'
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
import { Button } from '@/components/ui/button'

export function ListDetail() {
  const { list, removeProduct } = useList()

  if (!list) return null

  const handleDelete = (productId: string) => {
    removeProduct(productId)
  }

  return (
    <div className="pb-24">
      <h1 className="text-2xl font-bold mb-6">{list.name}</h1>
      
      <ListActions />

      <div className="space-y-2">
        {list.productsList.map((product) => (
          <AlertDialog key={product.id}>
            <AlertDialogTrigger asChild>
              <div>
                <ProductCard
                  product={product}
                  onDelete={() => {}}
                />
              </div>
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
                <AlertDialogAction onClick={() => handleDelete(product.id)}>
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>

      <ListFooter />
    </div>
  )
}