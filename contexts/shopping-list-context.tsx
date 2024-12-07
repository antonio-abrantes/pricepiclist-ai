"use client";

import { ShoppingList } from "@/types/shopping-list";
import { useLocalStorage } from '@/hooks/use-local-storage';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface CreateListData {
  name: string;
  maxValue: number;
}

interface UpdateListData {
  id: string;
  name: string;
  maxValue: number;
}

interface ShoppingListContextType {
  lists: ShoppingList[];
  createList: (data: CreateListData) => void;
  updateList: (data: UpdateListData) => void;
  deleteList: (id: string) => void;
  updateFullList: (updatedList: ShoppingList) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useLocalStorage<ShoppingList[]>('@smart-shopping:lists', []);

  const createList = useCallback((data: CreateListData) => {
    const newList: ShoppingList = {
      id: crypto.randomUUID(),
      productsList: [],
      ...data,
      createdAt: new Date(),
      total: 0,
    };

    setLists((prev) => [...prev, newList]);
  }, [setLists]);

  const updateList = useCallback((data: UpdateListData) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === data.id
          ? {
              ...list,
              name: data.name,
              maxValue: data.maxValue,
            }
          : list
      )
    );
  }, [setLists]);

  const updateFullList = useCallback((updatedList: ShoppingList) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === updatedList.id ? updatedList : list
      )
    );
  }, [setLists]);

  const deleteList = useCallback((id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  }, [setLists]);

  return (
    <ShoppingListContext.Provider
      value={{ 
        lists, 
        createList, 
        updateList, 
        deleteList,
        updateFullList
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error(
      "useShoppingList must be used within a ShoppingListProvider"
    );
  }
  return context;
}