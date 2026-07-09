'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, getMyNoteIds } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import Link from 'next/link';
import css from './NotesPage.module.css';

interface Props {
  tag: string;
}

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, tag),
  });

  const myNoteIds = getMyNoteIds();

  const filteredNotes =
    data?.notes.filter((note) => myNoteIds.includes(note.id)) ?? [];

  const hasNoNotes = !isLoading && !isError && filteredNotes.length === 0;

  return (
    <div className={css.wrapper}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

        <Link href="/notes/action/create" className={css.createBtn}>
          Create note +
        </Link>
      </div>

      {isLoading && <Loader text="Loading notes" fullScreen={false} />}

      {isError && (
        <div className={css.emptyState}>
          <p className={css.emptyIcon}>⚠</p>
          <h2>Error loading notes</h2>
          <p>Please try again later.</p>
        </div>
      )}

      {hasNoNotes && (
        <div className={css.emptyState}>
          <p className={css.emptyIcon}>✦</p>
          <h2>No notes found</h2>
          <p>Create your first note and it will appear here.</p>

          <Link href="/notes/action/create" className={css.emptyButton}>
            Create note +
          </Link>
        </div>
      )}

      {!isLoading && filteredNotes.length > 0 && (
        <NoteList notes={filteredNotes} />
      )}

      {!isLoading && data?.totalPages && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}