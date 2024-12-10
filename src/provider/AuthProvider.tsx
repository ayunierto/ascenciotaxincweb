'use client';

import React, { PropsWithChildren, useEffect } from 'react';

import { useAuthStore } from '@/store/useAuthStore';
import LoadingPage from '@/components/loading';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // const router = useRouter();

  const { checkStatus, status } = useAuthStore();

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'checking') {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default AuthProvider;
