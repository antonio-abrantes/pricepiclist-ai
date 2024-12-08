import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { menuItems } from "@/config/menu";
import { LogOut } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Label } from "../ui/label";
import { useProfile } from "@/contexts/profile-context";
import { useEffect } from "react";

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {

  const { profile } = useProfile();

  const handleItemClick = () => {
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex flex-col items-center py-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatarUrl ?? 'https://github.com/shadcn.png'} />
            <AvatarFallback>Toni</AvatarFallback>
          </Avatar>
          <Label className="text-lg font-bold mt-1">{profile.name ?? 'Anônimo'}</Label>
        </div>
        <nav className="flex-1">
          <div className="flex flex-col gap-2 w-full">
            {menuItems.map((item) => {
              const Icon = item.icon;

              if (item.label === "Sair") return null; // Trata o botão de sair separadamente

              return (
                <Link key={item.href} href={item.href} onClick={handleItemClick}>
                  <Button variant="ghost" className="justify-start gap-2 w-full">
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <a href="https://github.com/antonio-abrantes/pricepiclist-ai" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="justify-start gap-2 w-full">
                <FaGithub className="h-5 w-5" />
                <p>Star on GitHub</p>
              </Button>
            </a>
          </div>
        </nav>

        <Button variant="ghost" className="justify-start gap-2 mt-auto">
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </SheetContent>
    </Sheet>
  );
}