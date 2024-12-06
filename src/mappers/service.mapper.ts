import { Service } from '@/domain/entities';
import { ServiceResponse } from '@/interfaces';

export class ServiceMapper {
  static serviceToEntity(service: ServiceResponse): Service {
    return {
      id: service.id,
      title: service.title,
      isAvailableOnline: service.isAvailableOnline,
      duration: service.duration,
      isActive: service.isActive,
      image: service.images[0].url,
    };
  }
}
