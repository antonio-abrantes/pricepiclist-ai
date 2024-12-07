"use client";

import { ShoppingList } from "@/types/shopping-list";

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
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(
  undefined
);

const STORAGE_KEY = "@smart-shopping:lists";

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<ShoppingList[]>([
    { 
      id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', 
      name: 'Lista01', 
      maxValue: 2001.00,
      createdAt: new Date(),
      total: 57.30,
      productsList: [
        {
          id: '1',
          productName: "Arroz Integral",
          price: 15.90,
          quantidade: 2,
          total: 31.80,
        },
        {
          id: '2',
          productName: "Feijão Preto",
          price: 8.71,
          quantidade: 4,
          total: 25.50,
        }
      ]
    },
    { 
      id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q', 
      name: 'Lista02', 
      createdAt: new Date(),
      maxValue: 1200.00,
      total: 29.90,
      productsList: [
        {
          id: '3',
          productName: "Azeite Extra Virgem",
          price: 29.90,
          quantidade: 1,
          total: 29.90,
        }
      ]
    },
  ]);

  useEffect(() => {
    const storedLists = localStorage.getItem(STORAGE_KEY);
    if (storedLists) {
      const parsedLists = JSON.parse(storedLists).map((list: any) => ({
        ...list,
        createdAt: new Date(list.createdAt),
      }));
      setLists(parsedLists);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const createList = useCallback((data: CreateListData) => {
    const newList: ShoppingList = {
      id: crypto.randomUUID(),
      productsList: [],
      ...data,
      createdAt: new Date(),
      total: 0,
    };

    console.log(newList);
    setLists((prev) => [...prev, newList]);
  }, []);

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
  }, []);

  const deleteList = useCallback((id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  }, []);

  return (
    <ShoppingListContext.Provider
      value={{ lists, createList, updateList, deleteList }}
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