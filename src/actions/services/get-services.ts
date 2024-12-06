// import { ServiceMapper } from '@/mappers/service.mapper';
import { ServiceMapper } from '@/mappers/service.mapper';
import { Service } from '../../domain/entities/service';

export const getServices = async (): Promise<Service[]> => {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
    const data = await resp.json();

    const services: Service[] = data.map(ServiceMapper.serviceToEntity);
    return services;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting services');
  }
};
