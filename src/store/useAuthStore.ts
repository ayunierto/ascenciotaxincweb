import { checkSatus, signin, signup } from '@/actions/auth';
import { StorageAdapter } from '@/config/adapters/storage-adapter';
import { User } from '@/domain/entities/user';
import { AuthResponse, AuthStatus } from '@/interfaces';
import { create } from 'zustand';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  signin: (email: string, password: string) => Promise<AuthResponse | null>;
  signup: (
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<AuthResponse | null>;
  checkStatus: () => Promise<AuthResponse | null>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  signin: async (email: string, password: string) => {
    const response = await signin({ email, password });
    if (!response) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return null;
    }

    if (response.token) {
      await StorageAdapter.setItem('token', response.token);
      const user: User = {
        email: response.email!,
        fullName: response.fullName!,
        id: response.id!,
        isActive: response.isActive!,
        phoneNumber: response.phoneNumber!,
        roles: response.roles!,
      };

      set({
        status: 'authenticated',
        token: response.token,
        user: user,
      });
      return response;
    }

    // Devuelve el error y el codigo de estado
    return response;
  },

  signup: async (
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => {
    const response = await signup({ fullName, email, phoneNumber, password });

    if (!response) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return null;
    }

    if (response.token) {
      await StorageAdapter.setItem('token', response.token);
      const user: User = {
        email: response.email!,
        fullName: response.fullName!,
        id: response.id!,
        isActive: response.isActive!,
        phoneNumber: response.phoneNumber!,
        roles: response.roles!,
      };

      set({
        status: 'authenticated',
        token: response.token,
        user: user,
      });
      return response;
    }

    // Devuelve el error y el codigo de estado
    return response;
  },

  checkStatus: async () => {
    set({ status: 'checking' });
    const token = (await StorageAdapter.getItem('token')) || undefined;
    const response = await checkSatus(token);

    if (!response) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return null;
    }

    if (response.token) {
      await StorageAdapter.setItem('token', response.token);
      const user: User = {
        email: response.email!,
        fullName: response.fullName!,
        id: response.id!,
        isActive: response.isActive!,
        phoneNumber: response.phoneNumber!,
        roles: response.roles!,
      };

      set({
        status: 'authenticated',
        token: response.token,
        user: user,
      });
      return response;
    }

    // Devuelve el error y el codigo de estado
    set({ status: 'unauthenticated', token: undefined, user: undefined });
    return response;
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
}));
