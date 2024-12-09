import { User } from '../../domain/entities/';

export const getUserById = async (id: string): Promise<User> => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting user');
  }
};
