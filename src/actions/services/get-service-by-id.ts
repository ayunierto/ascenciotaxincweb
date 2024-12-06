import { ServiceMapper } from '@/mappers/service.mapper';
import { Service } from '../../domain/entities/service';

export const getServiceById = async (id: string): Promise<Service> => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`
    );
    const data: Service = await resp.json();
    const service: Service = ServiceMapper.serviceToEntity(data);

    return service;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting service');
  }
};
