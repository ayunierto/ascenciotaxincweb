'use client';

import Link from 'next/link';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DashboardBreadcrumb from '@/components/dashboard/dashboard-breadcrumb';
import { getServices } from '@/actions/services/get-services';
import DashboardServiceTable from '@/components/dashboard/services/dashboard-service-table';
import { Suspense, useEffect, useState } from 'react';
import { Service } from '@/domain/entities';
import LoadingPage from '@/components/loading';
import { deleteService } from '@/actions/services/delete-service';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getServices();
        setServices(result);
      } catch (err) {
        setError(`Error fetching data ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const onDeleteService = async (id: string) => {
    const deletedService = await deleteService(id);

    if (deletedService) {
      toast({
        description: `Deleted service ${deletedService.title}`,
        variant: 'success',
      });
      setServices(services.filter((service) => service.id !== id));
      return;
    }

    toast({
      description: `Error deleteting service`,
      variant: 'destructive',
    });
  };

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <DashboardBreadcrumb
        items={[
          { name: 'Dashboard', url: '/dashboard' },
          { name: 'Services', url: '/dashboard/services' },
        ]}
      />

      <main className="px-4 space-y-4">
        <div className="flex justify-end">
          <Link href={'services/add'}>
            <Button variant={'secondary'}>
              <Plus /> Add service
            </Button>
          </Link>
        </div>
        <DashboardServiceTable
          services={services}
          deleteService={onDeleteService}
        />
      </main>
    </Suspense>
  );
}
