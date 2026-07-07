'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  const pathname = usePathname();

  const isHomeActive = pathname === '/';
  const isNotesActive = pathname.startsWith('/notes');

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link href="/" className={css.logo}>
          Note Flow
        </Link>

        <ul className={css.navigationList}>
          <li className={css.navigationItem}>
            <Link
              href="/"
              className={`${css.link} ${isHomeActive ? css.active : ''}`}
            >
              Home
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/notes/filter/all"
              className={`${css.link} ${isNotesActive ? css.active : ''}`}
            >
              Notes
            </Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}