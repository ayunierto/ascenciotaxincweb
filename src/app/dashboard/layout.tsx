import { DashboardSidebar } from '@/components/dashboard-sidebar';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
