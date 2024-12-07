"use client";

import { CreateListButton } from "@/components/shopping-list/create-list-button";
import { ListCard } from "@/components/shopping-list/list-card";
import { useShoppingList } from "@/contexts/shopping-list-context";

export default function Home() {
  const { lists } = useShoppingList();

  return (
    <main className="container mx-auto px-4 py-8">
      <CreateListButton />
      
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lists.map((list) => (
          <ListCard
            key={list.id}
            id={list.id}
            name={list.name}
            maxValue={list.maxValue}
            createdAt={list.createdAt}
          />
        ))}
      </div>
    </main>
  );
}