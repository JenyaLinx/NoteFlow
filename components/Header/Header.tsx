'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  const isHomeActive = pathname === '/';
  const isNotesActive = pathname.startsWith('/notes');

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link href="/" className={css.logo} onClick={closeMenu}>
          Note Flow
        </Link>

        <button
          type="button"
          className={`${css.burger} ${isMenuOpen ? css.burgerActive : ''}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${css.navigationList} ${isMenuOpen ? css.menuOpen : ''}`}>
          <li className={css.navigationItem}>
            <Link
              href="/"
              className={`${css.link} ${isHomeActive ? css.active : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/notes/filter/all"
              className={`${css.link} ${isNotesActive ? css.active : ''}`}
              onClick={closeMenu}
            >
              Notes
            </Link>
          </li>

          <AuthNavigation onNavigate={closeMenu} />
        </ul>
      </nav>
    </header>
  );
}