import { AuthResponse } from '@/interfaces';
import { returnUserResponseData } from './helpers';
import { createSession } from '@/app/lib/session';

interface Props {
  email: string;
  password: string;
}

export async function signup({
  email,
  password,
}: Props): Promise<AuthResponse | null> {
  email = email.toLocaleLowerCase();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data: AuthResponse = await response.json();
    if (data.token) {
      await createSession(data.token);
    }
    return returnUserResponseData(data);
  } catch (error) {
    console.log(error);
    return null;
  }
}
