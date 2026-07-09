'use client';

import Link from 'next/link';
import css from './SignUpPage.module.css';
import { createNote, register, resetMyNoteIds } from '@/lib/api/clientApi';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

const starterNotes = [
  {
    title: 'Planned meeting',
    content: 'Prepare agenda, confirm the time and send a reminder before the meeting.',
    tag: 'Meeting',
  },
  {
    title: 'Shopping list',
    content: 'Milk, bread, eggs, fruit, vegetables and coffee.',
    tag: 'Shopping',
  },
  {
    title: 'Vacation start date',
    content: 'Check the start date of vacation, book tickets and prepare travel documents.',
    tag: 'Travel',
  },
];

export default function SignUpPage() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError('');

    const data = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };

    if (!data.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (data.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await register(data);

        if (res) {
          setUser(res);
          resetMyNoteIds();

          await Promise.allSettled(
            starterNotes.map((note) => createNote(note))
          );

          router.push('/');
          router.refresh();
        }
      } catch {
        setError('Network Error');
      }
    });
  };

  return (
    <main className={css.mainContent}>
      <section className={css.authCard}>
        <div className={css.header}>
          <p className={css.badge}>Create account</p>
          <h1 className={css.formTitle}>Sign up</h1>
          <p className={css.subtitle}>
            Start organizing your thoughts with Note Flow.
          </p>
        </div>

        <form action={handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={6}
              className={css.input}
              required
            />
          </div>

          <button type="submit" className={css.submitButton} disabled={isPending}>
            {isPending ? 'Creating account...' : 'Register'}
          </button>

          {error && <p className={css.error}>{error}</p>}
        </form>

        <p className={css.authLinkText}>
          Already have an account?{' '}
          <Link href="/sign-in" className={css.authLink}>
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}