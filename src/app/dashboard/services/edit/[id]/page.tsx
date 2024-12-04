import { notFound } from 'next/navigation';

import ServiceForm from '@/components/services/service-form';
import DashboardBreadcrumb from '@/components/dashboard/dashboard-breadcrumb';
import { getServiceById } from '@/actions/services/get-service-by-id';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage(props: Props) {
  const params = await props.params;
  const { id } = params;

  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <>
      <DashboardBreadcrumb
        items={[
          { name: 'Dashboard', url: '/dashboard' },
          { name: 'Services', url: '/dashboard/services' },
          { name: 'Edit Service', url: '/dashboard/services/edit' },
        ]}
      />
      <main className="p-4 space-y-4">
        <ServiceForm service={service} />
      </main>
    </>
  );
}
