import { Service } from '../../domain/entities/service';

export const getServiceById = async (id: string): Promise<Service> => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`
    );
    const service: Service = await data.json();

    return service;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting service');
  }
};
