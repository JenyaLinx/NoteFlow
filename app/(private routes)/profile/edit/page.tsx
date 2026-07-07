'use client';

import css from './page.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Image from 'next/image';

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const [username, setUsername] = useState(user?.username || '');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      try {
        const updated = await updateMe({ username });

        if (updated) {
          setUser(updated);
          router.push('/profile');
        }
      } catch {
        setError('Failed to update profile. Please try again.');
      }
    });
  };

  return (
    <main className={css.mainContent}>
      <section className={css.profileCard}>
        <div className={css.header}>
          <p className={css.badge}>Profile settings</p>
          <h1 className={css.formTitle}>Edit Profile</h1>
          <p className={css.subtitle}>
            Update your username. It will appear in the navigation instead of
            your email.
          </p>
        </div>

        <Image
          src={user?.avatar || 'https://via.placeholder.com/120'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.formGroup}>
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className={css.emailBox}>
            <span>Email</span>
            <p>{user?.email}</p>
          </div>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.saveButton}
              disabled={isPending}
            >
              {isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}