export interface Service {
  id: string;
  title: string;
  isAvailableOnline: boolean;
  duration: string;
  description: string | null;
  isActive: boolean;
  images: ServiceImage[];
  user: User;
}

export interface ServiceImage {
  id: number;
  url: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: null;
  isActive: boolean;
  roles: string[];
}
