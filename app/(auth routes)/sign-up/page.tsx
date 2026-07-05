'use client';

import Link from 'next/link';
import css from './SignUpPage.module.css';
import { register } from '@/lib/api/clientApi';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUpPage() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError('');

    startTransition(async () => {
      try {
        const data = Object.fromEntries(formData) as {
          email: string;
          password: string;
        };

        const res = await register(data);

        if (res) {
          setUser(res);
          router.push('/profile');
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
          <p className={css.subtitle}>Start organizing your thoughts with Note Flow.</p>
        </div>

        <form action={handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className={css.input} required />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" className={css.input} required />
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