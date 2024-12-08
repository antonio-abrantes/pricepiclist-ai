"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useShoppingList } from "@/contexts/shopping-list-context";
import { useEffect } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  maxValue: z.coerce
    .number()
    .min(0, "Valor deve ser maior que zero")
    .nonnegative("Valor não pode ser negativo"),
});

interface ListFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  defaultValues?: {
    id: string;
    name: string;
    maxValue: number;
  };
}

export function ListForm({
  open,
  onOpenChange,
  mode,
  defaultValues,
}: ListFormProps) {
  const { createList, updateList } = useShoppingList();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      maxValue: 0,
    },
  });

  useEffect(() => {
    if (open && mode === "create") {
      form.reset({
        name: "",
        maxValue: 0,
      });
    }
  }, [open, mode, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === "create") {
      createList({
        name: values.name,
        maxValue: values.maxValue,
      });
    } else {
      updateList({
        id: values.id!,
        name: values.name,
        maxValue: values.maxValue,
      });
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Nova Lista" : "Editar Lista"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Lista</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxValue"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Valor Máximo</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Define um limite de gastos para esta lista. O sistema alertará quando o total estiver próximo ou ultrapassar este valor.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {mode === "create" ? "Criar Lista" : "Salvar Alterações"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}