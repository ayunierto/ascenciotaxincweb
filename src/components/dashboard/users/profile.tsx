'use client';

import { useEffect, useState } from 'react';

import { getUserById } from '@/actions/users';
import ProfileForm from './profile-form';
import LoadingPage from '@/components/loading';
import { User } from '@/domain/entities';

interface Props {
  id: string;
}

export default function Profile({ id }: Props) {
  const [user, setUser] = useState<User>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await getUserById(id);
        setUser(result);
      } catch (err) {
        setError(`Error fetching data ${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  return <ProfileForm user={user!} />;
}
