'use client'

import { ListProvider } from '@/contexts/list-context'
import { ListDetail } from './list-detail'
import { useShoppingList } from '@/contexts/shopping-list-context';
import { Loading } from '@/components/ui/loading';
import { ShoppingList } from '@/types/shopping-list';
import { useEffect, useState } from 'react';

export default function ListPage({ params }: { params: { id: string } }) {
  const { lists } = useShoppingList();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    const list = lists.find(list => list.id === params.id)
    if (list) {
      setList(list)
    } else {
      setList(null)
    }
    setLoading(false)
  }, [lists, params.id])

  return (
    <>
      {!list && loading ? <Loading /> : (
        <>
          {!loading && !list && <div>Lista não encontrada</div>}
          {!loading && list && (
            <ListProvider initialList={list}>
              <div className="container mx-auto px-4 py-8">
                <ListDetail />
              </div>
            </ListProvider>
          )}
        </>
      )}
    </>
  )
}