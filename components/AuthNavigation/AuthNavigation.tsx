'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

export default function AuthNavigation() {
  const { isAuthenticated, user } = useAuthStore();
  const clear = useAuthStore((s) => s.clearIsAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  const displayName = user?.username || user?.email || 'Account';

  const handleLogout = async () => {
    await logout();
    clear();
    router.push('/sign-in');
  };

  if (isAuthenticated) {
    return (
      <div className={css.userContainer}>
        <p className={css.userEmail} title={displayName}>
          {displayName}
        </p>

        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={css.authLinks}>
      <Link
        href="/sign-in"
        prefetch={false}
        className={`${css.navigationLink} ${
          pathname.startsWith('/sign-in') ? css.active : ''
        }`}
      >
        Login
      </Link>

      <Link
        href="/sign-up"
        prefetch={false}
        className={`${css.navigationLink} ${
          pathname.startsWith('/sign-up') ? css.active : ''
        }`}
      >
        Sign up
      </Link>
    </div>
  );
}