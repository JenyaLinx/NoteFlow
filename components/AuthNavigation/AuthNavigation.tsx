'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

type AuthNavigationProps = {
  onNavigate?: () => void;
};

export default function AuthNavigation({ onNavigate }: AuthNavigationProps) {
  const { isAuthenticated, user } = useAuthStore();
  const clear = useAuthStore((s) => s.clearIsAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    clear();
    onNavigate?.();
    router.push('/sign-in');
  };

  if (isAuthenticated) {
    const isProfileActive = pathname.startsWith('/profile');

    return (
      <>
        <li className={css.navigationItem}>
          <Link
            href="/profile"
            prefetch={false}
            className={`${css.navigationLink} ${
              isProfileActive ? css.active : ''
            }`}
            onClick={onNavigate}
          >
            Profile
          </Link>
        </li>

        <li className={css.navigationItem}>
          <div className={css.userContainer}>
            <p className={css.userEmail} title={user?.email}>
              {user?.email}
            </p>

            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </div>
        </li>
      </>
    );
  }

  const isSignInActive = pathname.startsWith('/sign-in');
  const isSignUpActive = pathname.startsWith('/sign-up');

  return (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={`${css.navigationLink} ${
            isSignInActive ? css.active : ''
          }`}
          onClick={onNavigate}
        >
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={`${css.navigationLink} ${
            isSignUpActive ? css.active : ''
          }`}
          onClick={onNavigate}
        >
          Sign up
        </Link>
      </li>
    </>
  );
}