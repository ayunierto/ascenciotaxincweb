export interface Service {
  id: string;
  title: string;
  isAvailableOnline: boolean;
  isActive: boolean;
  duration: string;
  description?: string;
  images: string[];
}
