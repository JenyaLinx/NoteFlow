'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './SidebarNotes.module.css';

const tags = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <nav className={css.sidebarNav} aria-label="Notes filters">
      <p className={css.sidebarTitle}>Categories</p>

      <ul className={css.menuList}>
        {tags.map((tag) => {
          const href =
            tag === 'All' ? '/notes/filter/all' : `/notes/filter/${tag}`;

          const isActive = pathname === href;

          return (
            <li key={tag} className={css.menuItem}>
              <Link
                href={href}
                className={`${css.menuLink} ${isActive ? css.active : ''}`}
              >
                <span className={css.dot} />
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}