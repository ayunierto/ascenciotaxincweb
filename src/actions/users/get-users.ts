import { User } from '@/domain/entities';

export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem('token');
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await resp.json();

    // const users: User[] = data.map(UsersMapper.userToEntity);
    // return users;
    if (data.statusCode === 401) {
      return [];
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting users');
  }
};
