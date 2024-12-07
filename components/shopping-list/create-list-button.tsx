"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ListForm } from "./list-form";
import { useState } from "react";

export function CreateListButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        size="lg"
        className="w-full gap-2"
        onClick={() => setShowModal(true)}
      >
        <Plus className="h-5 w-5" />
        Nova Lista
      </Button>

      <ListForm
        open={showModal}
        onOpenChange={setShowModal}
        mode="create"
      />
    </>
  );
}