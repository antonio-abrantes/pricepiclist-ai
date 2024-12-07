"use client"

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { useList } from '@/contexts/list-context'

export function ListFooter() {
  const { list, clearList } = useList()

  if (!list) return null

  const MAX_VALUE = list.maxValue
  const WARNING_THRESHOLD = list.maxValue * 0.8

  const getColorByTotal = () => {
    if (list.total >= MAX_VALUE) return 'text-destructive'
    if (list.total > WARNING_THRESHOLD) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
      <div className="container mx-auto px-4 flex justify-between items-center">

        <div className={`text-lg font-semibold ${getColorByTotal()}`}>
          <span className="text-sm text-muted-foreground">
            Itens: {list.productsList.reduce((acc, product) => acc + product.quantidade, 0)}
          </span><br />
          Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(list.total)}
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2 className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Limpar Lista</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover todos os itens da lista?
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={clearList}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}