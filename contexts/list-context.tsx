"use client"

import { Product, ShoppingList } from '@/types/shopping-list'
import { createContext, useContext, useState, useCallback } from 'react'
import { useShoppingList } from './shopping-list-context'

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
  const [list, setList] = useState<ShoppingList>(initialList);
  const { updateFullList } = useShoppingList();

  const addProduct = useCallback((product: Omit<Product, 'id' | 'total'>) => {
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
      total: product.price * product.quantidade
    }

    const updatedList = {
      ...list,
      productsList: [...list.productsList, newProduct],
      total: list.total + newProduct.total
    };

    setList(updatedList);
    updateFullList(updatedList);
  }, [list, updateFullList]);

  const removeProduct = useCallback((productId: string) => {
    setList(prev => {
      const product = prev.productsList.find(p => p.id === productId)
      if (!product) return prev

      const updatedList = {
        ...prev,
        productsList: prev.productsList.filter(p => p.id !== productId),
        total: prev.total - product.total
      };

      updateFullList(updatedList);
      return updatedList;
    })
  }, [updateFullList]);

  const clearList = useCallback(() => {
    setList(prev => {
      const updatedList = {
        ...prev,
        productsList: [],
        total: 0
      };

      updateFullList(updatedList);
      return updatedList;
    })
  }, [updateFullList]);

  const updateList = useCallback((newList: ShoppingList) => {
    setList(newList);
    updateFullList(newList);
  }, [updateFullList]);

  return (
    <ListContext.Provider value={{ 
      list, 
      addProduct, 
      removeProduct, 
      clearList, 
      updateList 
    }}>
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