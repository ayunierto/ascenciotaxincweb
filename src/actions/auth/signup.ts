import { AuthResponse } from '@/interfaces';
import { returnUserResponseData } from './helpers';

interface Props {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
}

export const signup = async ({
  email,
  fullName,
  password,
  phoneNumber,
}: Props): Promise<AuthResponse | null> => {
  try {
    email = email.toLocaleLowerCase().trim();
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fullName,
        password,
        phoneNumber,
      }),
    });
    const data = await resp.json();
    return returnUserResponseData(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
