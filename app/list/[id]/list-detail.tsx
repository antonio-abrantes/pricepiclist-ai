"use client"

import { useList } from '@/contexts/list-context'
import { ListActions } from './_components/list-actions'
import { ProductCard } from './_components/product-card'
import { ListFooter } from './_components/list-footer'

export function ListDetail() {
  const { list, removeProduct } = useList()

  if (!list) return null

  const handleDelete = (productId: string) => {
    removeProduct(productId)
  }

  return (
    <div className="pb-24">
      <h1 className="text-2xl font-bold mb-6">Lista: {list.name}</h1>

      <ListActions />
        <div className="space-y-2">
          {list.productsList.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={product}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      <ListFooter />
    </div>
  )
}