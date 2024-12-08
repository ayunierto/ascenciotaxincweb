import { Service } from '@/domain/entities';

export const deleteService = async (id: string): Promise<Service> => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to delete the service.');
  }
};
