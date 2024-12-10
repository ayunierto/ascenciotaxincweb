import { AuthResponse } from '@/interfaces';
import { returnUserResponseData } from './helpers';

export const checkSatus = async (
  token?: string
): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/check-status`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return returnUserResponseData(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
