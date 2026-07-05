'use client';

import { useEffect, useState } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

function NeonLoader() {
  return (
    <div className="neonLoaderScreen">
      <div className="neonLoaderBox">
        <div className="neonSpinner" />
        <p className="neonLoaderText">Loading NoteHub</p>
      </div>
    </div>
  );
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const isAuth = await checkSession();

        if (isAuth) {
          const user = await getMe();
          setUser(user);
        } else {
          clear();
        }
      } catch {
        clear();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, clear]);

  if (loading) return <NeonLoader />;

  return <>{children}</>;
}