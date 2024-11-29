import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { initialData } from '@/seed/seed-data';
import { Video, VideoOff } from 'lucide-react';
import Image from 'next/image';

const services = initialData.services;

export default function ServicesPage() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-10">
      {services.map((service) => (
        <Card key={service.title} className="overflow-hidden">
          <Image
            src={service.images[0]}
            alt="service iamge"
            width={200}
            height={200}
            className="w-full h-auto"
          />
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {service.isAvailableOnline ? (
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
      ))}
    </div>
  );
}
