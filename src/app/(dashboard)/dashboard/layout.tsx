import { ReactNode } from 'react'
import SidebarMenu from '@/components/SidebarMenu'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarMenu />
      <main className="flex-1">{children}</main>
    </div>
  );
}