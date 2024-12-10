import { User } from '@/domain/entities';

export interface ServiceResponse {
  id: string;
  title: string;
  isAvailableOnline: boolean;
  duration: string;
  description: string;
  isActive: boolean;
  images: Images[];
  user: User;
}

interface Images {
  id: string;
  url: string;
}
