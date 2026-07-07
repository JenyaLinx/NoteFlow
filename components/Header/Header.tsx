'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  const pathname = usePathname();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const logoWrapperRef = useRef<HTMLDivElement | null>(null);

  const isHomeActive = pathname === '/';
  const isNotesActive = pathname.startsWith('/notes');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoWrapperRef.current &&
        !logoWrapperRef.current.contains(event.target as Node)
      ) {
        setIsInfoOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsInfoOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div className={css.logoWrapper} ref={logoWrapperRef}>
          <button
            type="button"
            className={css.logo}
            onClick={() => setIsInfoOpen((prev) => !prev)}
          >
            Note Flow
          </button>

          {isInfoOpen && (
            <div className={css.infoCard}>
              <p className={css.infoTitle}>Note Flow</p>
              <p className={css.infoText}>
                A modern neon notes app created by Yevhenii Oliinyk.
              </p>

              <div className={css.infoLinks}>
                <a href="mailto:sportpit2020@gmail.com">Mail</a>
                <a
                  href="https://www.linkedin.com/in/yevhenii-oliinykk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/y.0liinyk?igsh=ZDY1ZGh0Z2o2Zjgy&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://t.me/jenyaoliinyk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </div>
            </div>
          )}
        </div>

        <ul className={css.centerNav}>
          <li>
            <Link href="/" className={`${css.link} ${isHomeActive ? css.active : ''}`}>
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/notes/filter/all"
              className={`${css.link} ${isNotesActive ? css.active : ''}`}
            >
              Notes
            </Link>
          </li>

          <li>
            <Link
              href="/profile"
              className={`${css.link} ${pathname.startsWith('/profile') ? css.active : ''}`}
            >
              Profile
            </Link>
          </li>
        </ul>

        <div className={css.accountArea}>
          <AuthNavigation />
        </div>
      </nav>
    </header>
  );
}