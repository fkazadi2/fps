"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mode d'accès libre temporaire
  const [isLoaded, setIsLoaded] = useState(true);
  
  // Désactivation temporaire de la vérification d'authentification
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   if (status === "loading") return;

  //   // Vérification si l'utilisateur est connecté et est un administrateur
  //   if (!session || !(session.user as any).isAdmin) {
  //     router.push("/admin/login");
  //   } else {
  //     setIsLoaded(true);
  //   }
  // }, [session, status, router]);

  // // Afficher un écran de chargement pendant la vérification
  // if (!isLoaded) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center bg-gray-50">
  //       <div className="text-center">
  //         <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-[var(--primary)] mx-auto"></div>
  //         <p className="text-gray-600">Chargement...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return <>{children}</>;
} 