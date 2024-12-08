import DashboardBreadcrumb from '@/components/dashboard/dashboard-breadcrumb';
import LoadingPage from '@/components/loading';
import ServiceForm from '@/components/services/service-form';
import { Suspense } from 'react';

export default function AddService() {
  return (
    <>
      <DashboardBreadcrumb
        items={[
          { name: 'Dashbaord', url: '/dashboard' },
          { name: 'Services', url: '/dashboard/services' },
          { name: 'Add Service', url: '/dashboard/services/add' },
        ]}
      />
      <main className="px-4">
        <Suspense fallback={<LoadingPage />}>
          <ServiceForm />
        </Suspense>
      </main>
    </>
  );
}
