"use client"

import { Product, ShoppingList } from '@/types/shopping-list'
import { createContext, useContext, useState, useCallback } from 'react'

interface ListContextType {
  list: ShoppingList | null
  addProduct: (product: Omit<Product, 'id' | 'total'>) => void
  removeProduct: (productId: string) => void
  clearList: () => void
  updateList: (list: ShoppingList) => void
}

const ListContext = createContext<ListContextType | undefined>(undefined)

export function ListProvider({ 
  children, 
  initialList 
}: { 
  children: React.ReactNode
  initialList: ShoppingList
}) {
  const [list, setList] = useState<ShoppingList>(initialList)

  const addProduct = useCallback((product: Omit<Product, 'id' | 'total'>) => {
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
      total: product.price * product.quantidade
    }

    setList(prev => ({
      ...prev,
      productsList: [...prev.productsList, newProduct],
      total: prev.total + newProduct.total
    }))
  }, [])

  const removeProduct = useCallback((productId: string) => {
    setList(prev => {
      const product = prev.productsList.find(p => p.id === productId)
      if (!product) return prev

      return {
        ...prev,
        productsList: prev.productsList.filter(p => p.id !== productId),
        total: prev.total - product.total
      }
    })
  }, [])

  const clearList = useCallback(() => {
    setList(prev => ({
      ...prev,
      productsList: [],
      total: 0
    }))
  }, [])

  const updateList = useCallback((newList: ShoppingList) => {
    setList(newList)
  }, [])

  return (
    <ListContext.Provider value={{ list, addProduct, removeProduct, clearList, updateList }}>
      {children}
    </ListContext.Provider>
  )
}

export function useList() {
  const context = useContext(ListContext)
  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider')
  }
  return context
}