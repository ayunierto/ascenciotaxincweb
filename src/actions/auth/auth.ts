import { AuthResponse } from '@/interfaces';
import { User } from '../../domain/entities/user';

import * as dotenv from 'dotenv';

// Cargar el archivo .env manualmente
dotenv.config();
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLocaleLowerCase();
  try {
    const resp = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await resp.json();
    if (data.token) {
      return returnUserToken(data);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authRegister = async (
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string
) => {
  email = email.toLocaleLowerCase();
  try {
    const resp = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, fullName, phoneNumber }),
    });
    const data = await resp.json();
    if (data.token) {
      return returnUserToken(data);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckSatus = async (token?: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const resp = await fetch(`${API_URL}/auth/check-status`, {
      method: 'GET',
      headers: myHeaders,
    });
    const data = await resp.json();
    if (data.token) {
      return returnUserToken(data);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
