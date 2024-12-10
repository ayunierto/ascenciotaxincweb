import { AuthResponse } from '@/interfaces';

export const returnUserResponseData = (data: AuthResponse): AuthResponse => {
  return {
    email: data.email || undefined,
    error: data.error || undefined,
    fullName: data.fullName || undefined,
    id: data.id || undefined,
    isActive: data.isActive || undefined,
    message: data.message || undefined,
    // password: data.password || undefined,
    phoneNumber: data.phoneNumber || undefined,
    roles: data.roles || undefined,
    statusCode: data.statusCode || undefined,
    token: data.token || undefined,
  };
};
