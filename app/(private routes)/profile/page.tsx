import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import css from './page.module.css';
import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Note Flow | Profile',
  description: 'User profile page',
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <section className={css.profileCard}>
        <div className={css.header}>
          <div>
            <p className={css.badge}>Account</p>
            <h1 className={css.formTitle}>Profile</h1>
          </div>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || 'https://via.placeholder.com/120'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <div className={css.infoItem}>
            <span>Username</span>
            <p>{user?.username || 'No username yet'}</p>
          </div>

          <div className={css.infoItem}>
            <span>Email</span>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className={css.actions}>
          <Link href="/notes/filter/all" className={css.myNotesButton}>
            My notes
          </Link>

          <Link href="/notes/action/create" className={css.createButton}>
            Create note +
          </Link>
        </div>
      </section>
    </main>
  );
}