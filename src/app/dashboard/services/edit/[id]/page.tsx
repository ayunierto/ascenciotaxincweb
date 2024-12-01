import { notFound } from 'next/navigation';
import { Service } from '@/interfaces';

import ServiceForm from '@/components/service-form';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage(props: Props) {
  const params = await props.params;
  const { id } = params;

  const data = await fetch(`${process.env.API_URL_BASE}/services/${id}`);
  const service: Service = await data.json();

  if (!service) {
    notFound();
  }

  return <ServiceForm service={service} />;
}
