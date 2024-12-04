import { authCheckSatus, authLogin, authRegister } from '@/actions/auth/auth';
import { StorageAdapter } from '@/config/adapters/storage-adapter';
import { User } from '@/domain/entities/user';
import { AuthStatus } from '@/interfaces';
import { create } from 'zustand';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }

    await StorageAdapter.setItem('token', resp.token);

    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },

  register: async (
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => {
    const resp = await authRegister(fullName, email, phoneNumber, password);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }

    await StorageAdapter.setItem('token', resp.token);

    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },

  checkStatus: async () => {
    set({ status: 'checking' });
    const token = (await StorageAdapter.getItem('token')) || undefined;
    const resp = await authCheckSatus(token);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }

    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
}));
