'use client'

import { ListProvider } from '@/contexts/list-context'
import { ListDetail } from './list-detail'
import { useShoppingList } from '@/contexts/shopping-list-context';

export default function ListPage({ params }: { params: { id: string } }) {
  const { lists } = useShoppingList();
  const list = lists.find(list => list.id === params.id)
  
  if (!list) {
    return <div>Lista não encontrada</div>
  }

  return (
    <ListProvider initialList={list}>
      <div className="container mx-auto px-4 py-8">
        <ListDetail />
      </div>
    </ListProvider>
  )
}