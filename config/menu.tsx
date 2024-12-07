import { Settings, User, LogOut } from "lucide-react";
import { LucideIcon, Shield } from "lucide-react";


interface MenuItem {
  label: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export const menuItems: MenuItem[] = [
  {
    label: "Perfil",
    icon: User,
    href: "/profile",
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/settings",
  },
  {
    label: 'Segurança', 
    icon: Shield, 
    href: '/security'
  }
]; 