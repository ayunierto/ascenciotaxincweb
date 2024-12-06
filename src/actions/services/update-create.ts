import { StorageAdapter } from '@/config/adapters/storage-adapter';
import { Service } from '@/domain/entities/service';
import { ServiceResponse } from '@/interfaces';

export const updateCreateService = async (
  service: Partial<ServiceResponse>
) => {
  if (service.id && service.id !== 'new') {
    return await updateService(service);
  }

  if (service.id === 'new') {
    return await createService(service);
  }

  throw new Error('Service is required');
};

const createService = async (service: Partial<Service>) => {
  const token = localStorage.getItem('token');
  try {
    const checkedImage = await prepareImages(service.image);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      `Bearer ${StorageAdapter.getItem('token')}`
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: service.title,
          isAvailableOnline: service.isAvailableOnline,
          duration: service.duration,
          description: '',
          isActive: service.isActive,
          images: [checkedImage],
        }),
        redirect: 'follow',
      }
    );

    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// TODO: revisar si viene el usuario
const updateService = async (service: Partial<Service>) => {
  const token = localStorage.getItem('token');
  // console.log({service});
  const { id, image = '', ...rest } = service;

  try {
    const checkedImage = await prepareImages(image);

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          images: [checkedImage],
          ...rest,
        }),
      }
    );

    const service: Service = await data.json();
    return service;
  } catch (error) {
    console.log(error);
  }
};

const prepareImages = async (
  image: File | string | undefined
): Promise<string> => {
  if (!image) {
    return '';
  }
  if (typeof image === 'object' && image instanceof File) {
    return await uploadFile(image);
  } else {
    return image;
  }
};

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files/service`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      return 'Error al subir el archivo';
    }
  } catch (error) {
    return `No se pudo subir la imagen ${error}`;
  }
}
