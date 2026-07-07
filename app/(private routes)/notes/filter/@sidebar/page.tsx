'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './SidebarNotes.module.css';

const tags = [
  { label: 'All notes', value: 'All', icon: '✨' },
  { label: 'Todo', value: 'Todo', icon: '✅' },
  { label: 'Work', value: 'Work', icon: '💼' },
  { label: 'Personal', value: 'Personal', icon: '❤️' },
  { label: 'Meeting', value: 'Meeting', icon: '📅' },
  { label: 'Shopping', value: 'Shopping', icon: '🛒' },
];

export default function SidebarNotes() {
  const pathname = usePathname();

  return (
    <nav className={css.sidebarNav} aria-label="Notes filters">
      <ul className={css.menuList}>
        {tags.map((tag) => {
          const href =
            tag.value === 'All'
              ? '/notes/filter/all'
              : `/notes/filter/${tag.value}`;

          const isActive = pathname === href;

          return (
            <li key={tag.value} className={css.menuItem}>
              <Link
                href={href}
                className={`${css.menuLink} ${isActive ? css.active : ''}`}
              >
                <span className={css.icon}>{tag.icon}</span>
                <span>{tag.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}