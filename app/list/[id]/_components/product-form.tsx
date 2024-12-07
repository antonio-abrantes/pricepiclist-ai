"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: { productName: string; price: number; quantidade: number }) => void
  priceObject: { name: string; price: string }
}

export function ProductForm({ isOpen, onClose, onSubmit, priceObject }: ProductFormProps) {
  const [productName, setProductName] = useState(priceObject.name)
  const [price, setPrice] = useState(priceObject.price)
  const [quantidade, setQuantidade] = useState(1)

  useEffect(() => {
    setProductName(priceObject.name)
    setPrice(priceObject.price)
  }, [priceObject])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      productName,
      price: Number(price),
      quantidade: Number(quantidade)
    })
    onClose()
    setQuantidade(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Nome do Produto</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}