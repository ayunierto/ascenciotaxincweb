import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Video, VideoOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { Service } from '@/interfaces';
import { initialData } from '@/seed/seed-data';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const seedServices = initialData.services;

export default async function DashboardServicePage(props: Props) {
  const params = await props.params;
  const { id } = params;

  const service: Service = seedServices.find(
    (service) => service.id === id
  ) || {
    duration: '',
    id: '',
    images: [],
    isActive: false,
    isAvailableOnline: false,
    title: '',
    description: '',
  };

  if (id !== service.id) {
    notFound();
  }

  return (
    <div className="flex">
      <Card className="overflow-hidden max-w-96">
        <Image
          src={service?.images[0]}
          alt="service iamge"
          width={200}
          height={200}
          className="w-full h-auto"
        />
        <CardHeader>
          <CardTitle>{service?.title}</CardTitle>
          <CardDescription>{service?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {service?.isAvailableOnline ? (
            <Badge variant={'secondary'}>
              <Video size={20} />
              <span className="ml-2">Available Online</span>
            </Badge>
          ) : (
            <Badge variant={'secondary'}>
              <VideoOff size={20} />
              <span className="ml-2">Not Available Online</span>
            </Badge>
          )}
        </CardContent>
        <CardFooter className="flex justify-end items-end">
          <Button variant={'outline'}>BOOK NOW</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
