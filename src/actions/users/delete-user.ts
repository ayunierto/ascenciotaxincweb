import { User } from '@/domain/entities';

export const deleteUser = async (id: string): Promise<User> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error to delete the user.');
  }
};
