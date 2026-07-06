import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Note Flow | Create note',
  description: 'Create a new note in Note Flow',
  openGraph: {
    title: 'Note Flow | Create note',
    description: 'Create a new note in Note Flow',
    url: '/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <section className={css.container}>
        <div className={css.header}>
          <p className={css.badge}>New note</p>
          <h1 className={css.title}>Create note</h1>
          <p className={css.subtitle}>
            Capture your ideas, tasks, plans or important thoughts in one place.
          </p>
        </div>

        <NoteForm />
      </section>
    </main>
  );
}