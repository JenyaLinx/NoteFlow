import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import css from './page.module.css';
import { getMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Note Flow | Profile',
  description: 'User profile dashboard',
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <section className={css.dashboard}>
        <div className={css.heroCard}>
          <div className={css.profileTop}>
            <Image
              src={user?.avatar || 'https://via.placeholder.com/120'}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

            <div>
              <p className={css.badge}>Account dashboard</p>
              <h1 className={css.title}>
                {user?.username || 'Your profile'}
              </h1>
              <p className={css.subtitle}>{user?.email}</p>
            </div>
          </div>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.infoGrid}>
          <div className={css.infoCard}>
            <span>Username</span>
            <p>{user?.username || 'No username yet'}</p>
          </div>

          <div className={css.infoCard}>
            <span>Email</span>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className={css.actionsGrid}>
          <Link href="/notes/filter/all" className={css.actionCard}>
            <span className={css.actionIcon}>📝</span>
            <h2>My notes</h2>
            <p>Open all your notes, categories and saved reminders.</p>
          </Link>

          <Link href="/notes/action/create" className={css.actionCard}>
            <span className={css.actionIcon}>＋</span>
            <h2>Create note</h2>
            <p>Add a new note with category and reminder date.</p>
          </Link>

          <Link href="/profile/edit" className={css.actionCard}>
            <span className={css.actionIcon}>⚙</span>
            <h2>Edit profile</h2>
            <p>Update your username and account details.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}