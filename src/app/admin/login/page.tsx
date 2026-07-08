"use client";

import React, { useEffect } from "react";
import LoginForm from "@/components/admin/LoginForm";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Redirection automatique vers le dashboard, puisque l'authentification est désactivée
  useEffect(() => {
    router.push("/admin/dashboard");
  }, [router]);

  // Affichage d'un message pendant la redirection
  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center">
      <div className="text-center p-6 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <div className="relative h-20 w-20">
            <Image
              src="/images/logo-fps.jpg"
              alt="Logo FPS"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>
        <h2 className="text-xl font-bold text-[var(--primary)] mb-2">
          Redirection en cours...
        </h2>
        <p className="text-gray-600 mb-4">
          L'authentification est temporairement désactivée. Vous allez être redirigé vers le dashboard.
        </p>
        <div className="h-2 w-32 mx-auto bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--primary)] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 