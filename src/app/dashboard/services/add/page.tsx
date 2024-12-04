import DashboardBreadcrumb from '@/components/dashboard/dashboard-breadcrumb';
import ServiceForm from '@/components/services/service-form';

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
        <ServiceForm />
      </main>
    </>
  );
}
