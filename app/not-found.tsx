import Link from 'next/link';
import css from './not-found.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: '/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <p className={css.code}>404</p>

      <h1 className={css.title}>Page not found</h1>

      <p className={css.description}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link href="/" className={css.button}>
        Back to Home
      </Link>
    </main>
  );
}