"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  Home, 
  Settings, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  Users, 
  Mail, 
  LayoutGrid,
  LogOut
} from "lucide-react";

// Structure des éléments de navigation
const navItems = [
  { name: "Tableau de bord", href: "/admin/dashboard", icon: Home },
  { name: "Site", href: "/admin/site", icon: Settings },
  { name: "Pages", href: "/admin/pages", icon: FileText },
  { name: "Actualités", href: "/admin/posts", icon: FileText },
  { name: "Médias", href: "/admin/media", icon: ImageIcon },
  { name: "Événements", href: "/admin/events", icon: Calendar },
  { name: "Programmes", href: "/admin/programmes", icon: LayoutGrid },
  { name: "Utilisateurs", href: "/admin/users", icon: Users },
  { name: "Messages", href: "/admin/messages", icon: Mail },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin/login" });
  };

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        <div className="relative h-10 w-10 mr-2">
          <Image
            src="/images/logo-fps.jpg"
            alt="Logo FPS"
            fill
            className="object-contain rounded-full"
          />
        </div>
        <span className="text-lg font-semibold text-[var(--primary)]">
          Admin FPS
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-[var(--primary-light)] text-[var(--primary)]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
} 