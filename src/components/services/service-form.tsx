'use client';
import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '../ui/checkbox';
import { Service } from '@/domain/entities/service';
import { updateCreateService } from '../../actions/services/update-create';
import { FilePenLine } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Props {
  service?: Service;
}

export default function ServiceForm({ service }: Props) {
  // Create a form schema
  const formSchema = z.object({
    id: z.string(),
    title: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    duration: z.string().min(2, {
      message: 'Duration must be at least 2 characters.',
    }),
    isAvailableOnline: z.boolean({
      required_error: 'Is Available Online is required',
      invalid_type_error: 'Is Available Online must be a boolean',
    }),
    isActive: z.boolean({
      required_error: 'Is Active is required',
      invalid_type_error: 'Is Active must be a boolean',
    }),

    image: z.union([
      z.instanceof(File).optional(), // Tipo File
      z.string(),
    ]), // Array de strings
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: service?.id || 'new',
      title: service?.title || '',
      isAvailableOnline: service?.isAvailableOnline || false,
      isActive: service?.isActive || false,
      duration: service?.duration || '',
      image: service ? service.image : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await updateCreateService(values);
    if (data?.id) {
      toast({
        description: 'Saved service',
        variant: 'success',
      });
    }
    // console.log({ data });
  }

  const serviceImage = service?.image || '/noImage.jpg';
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <div className="flex justify-end">
          <Button type="submit" variant={'secondary'}>
            {service ? 'Update' : 'Add'}
          </Button>
        </div>
        <div className=" border relative max-w-fit">
          <Image
            alt="Service image"
            src={serviceImage}
            width={200}
            height={200}
            className="w-auto h-auto rounded-md"
            priority
          />
          <div className="absolute top-2 right-2">
            <FormField
              control={form.control}
              name="image"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer rounded-full bg-[#0003] hover:bg-[#0005] flex p-2 transition-all ">
                    <FilePenLine className=" " />
                  </FormLabel>
                  <FormControl className="hidden">
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              {/* <FormDescription>Public display name.</FormDescription>  */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                Example: 30 min, 1 hr, 1 hr 30 min
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAvailableOnline"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available Online</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription />
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
