'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function AuthNavigation() {
  const { isAuthenticated, user } = useAuthStore();
  const clear = useAuthStore((s) => s.clearIsAuthenticated);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clear();
    router.push('/sign-in');
  };

  if (isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link
            href="/profile"
            prefetch={false}
            className={css.navigationLink}
          >
            Profile
          </Link>
        </li>

        <li className={css.navigationItem}>
          <div className={css.userContainer}>
            <p className={css.userEmail}>{user?.email}</p>

            <button
              onClick={handleLogout}
              className={css.logoutButton}
            >
              Logout
            </button>
          </div>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={css.navigationLink}
        >
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={css.navigationLink}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}