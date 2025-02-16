"use client";

import Navbar from './Navbar';
import { useSelectedLayoutSegments } from 'next/navigation';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const isAdminPage = segments[0] === 'admin';

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
    </>
  );
}