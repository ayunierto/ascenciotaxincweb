'use client';
import { useEffect } from 'react';

import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated' || !user?.roles.includes('admin')) {
      router.push('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <div>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
