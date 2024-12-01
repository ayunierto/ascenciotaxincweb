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
import { Service } from '@/interfaces';
import { Checkbox } from './ui/checkbox';

interface Props {
  service?: Service;
}

export default function ServiceForm({ service }: Props) {
  // Create a form schema
  const formSchema = z.object({
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
    description: z.string().max(150, {
      message: 'The description must have a maximum of 150 characters.',
    }),
    image: z
      .instanceof(File)
      .refine((file) => file.size < 2000000, {
        message: 'Your image must be less than 2MB.',
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: service?.title || '',
      isAvailableOnline: service?.isAvailableOnline || false,
      isActive: service?.isActive || false,
      duration: service?.duration || '',
      description: service?.description || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const serviceImage = service?.images[0].url || '/noImage.jpg';
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-end">
          <Button type="submit" variant={'secondary'}>
            {service ? 'Update' : 'Add'}
          </Button>
        </div>
        <div>
          <Image
            alt="Service image"
            src={serviceImage}
            width={200}
            height={200}
            className="w-auto h-auto rounded-md"
            priority
          />
          <FormField
            control={form.control}
            name="image"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="relative top-0 right-0">
                <FormLabel>Edit</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="data:image/jpg"
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
