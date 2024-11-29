import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { initialData } from '@/seed/seed-data';
import { MoreHorizontal, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = initialData.services;
  return (
    <>
      <div className="flex justify-end">
        <Button variant={'secondary'}>
          <Plus /> Add service
        </Button>
      </div>
      <Table>
        {services.length !== 0 ? (
          <TableCaption>A list of your services</TableCaption>
        ) : (
          <TableCaption>
            There are no services. Please create one{' '}
            <Link href={'#'} className="text-blue-600 underline">
              here
            </Link>
            .
          </TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Appointment Staff</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.title}>
              <TableCell className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={service.images[0]} />
                  <AvatarFallback>{service.title[0]}</AvatarFallback>
                </Avatar>
                {service.title}
              </TableCell>
              <TableCell>Free</TableCell>
              <TableCell>Show Availability</TableCell>
              <TableCell>
                <Badge variant="secondary" className="mr-2">
                  2
                </Badge>
                Staff
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link href={`/dashboard/services/edit/${service.id}`}>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="focus:bg-red-500">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
