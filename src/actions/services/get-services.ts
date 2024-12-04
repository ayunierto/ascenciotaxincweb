// import { ServiceMapper } from '@/mappers/service.mapper';
import { Service } from '../../domain/entities/service';

export const getServices = async (): Promise<Service[]> => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
    const services: Service[] = await data.json();

    // const services = data.map(ServiceMapper.serviceToEntity);
    return services;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting services');
  }
};
