"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import AdminLayoutInner from '@/components/admin/AdminLayoutInner';

/**
 * Layout racine de l'admin — injecte le SessionProvider NextAuth
 * La vraie protection se fait dans src/middleware.ts (JWT check)
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}