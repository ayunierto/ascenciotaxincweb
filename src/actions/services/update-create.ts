import { ServiceImage, Service } from '@/domain/entities/service';

export const updateCreateService = (service: Partial<Service>) => {
  if (service.id) {
    return updateService(service);
  }

  throw new Error('Service is required');
};

// TODO: revisar si viene el usuario
const updateService = async (service: Partial<Service>) => {
  const token = localStorage.getItem('token');
  console.log(service);
  const { id, images = [], ...rest } = service;

  try {
    const checkedImages = prepareImages(images);
    console.log(checkedImages);

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          images: checkedImages,
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

const prepareImages = (images: ServiceImage[]) => {
  // todo: revisar los files

  return images.map((image) => image.url);
};
