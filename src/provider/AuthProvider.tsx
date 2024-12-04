'use client';

import React, { PropsWithChildren, useEffect } from 'react';

// import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Loader2 } from 'lucide-react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // const router = useRouter();

  const { checkStatus, status } = useAuthStore();

  useEffect(() => {
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (status !== 'checking') {
    //   if (status === 'authenticated') {
    //     router.push('/');
    //   } else {
    //     router.push('/auth/login');
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === 'checking') {
    return (
      <div className="flex justify-center items-center h-screen gap-2 flex-col">
        <Loader2 className="animate-spin" /> <span>Loading ...</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
