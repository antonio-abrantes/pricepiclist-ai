"use client";

import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ListForm } from "./list-form";
import { DeleteListDialog } from "./delete-list-dialog";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface ListCardProps {
  id: string;
  name: string;
  maxValue: number;
  createdAt: Date;
  total: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ListCard({ id, name, maxValue, createdAt, total, onEdit, onDelete }: ListCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <Link href={`/list/${id}`}>
        <Card className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
          <div className="flex items-center justify-between">
            <div className="max-w-[220px]">
              <h3 className="font-semibold text-card-foreground truncate overflow-hidden text-ellipsis whitespace-nowrap">{name} texto grande para testar o limite da linha</h3>
              <p className="text-sm text-muted-foreground mt-[3px]">
                {formatCurrency(maxValue)}
              </p>
              {/* <span className="mx-2 text-muted-foreground">•</span> */}
              <p className="text-xs text-muted-foreground mt-1">{new Date(createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEditModal(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>

      <ListForm
        open={showEditModal}
        onOpenChange={setShowEditModal}
        mode="edit"
        defaultValues={{
          id,
          name,
          maxValue,
        }}
      />

      <DeleteListDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        listId={id}
        listName={name}
      />
    </>
  );
}