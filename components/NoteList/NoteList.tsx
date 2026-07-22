'use client';

import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const tagColors: Record<string, string> = {
  Todo: '#38bdf8',
  Work: '#3b82f6',
  Personal: '#ec4899',
  Meeting: '#06b6d4',
  Shopping: '#22c55e',
  Ideas: '#facc15',
  Travel: '#8b5cf6',
  Finance: '#f59e0b',
  Health: '#84cc16',
  Important: '#ef4444',
};

export default function NoteList({
  notes,
}: NoteListProps) {
  const queryClient = useQueryClient();

  const [editingNote, setEditingNote] =
    useState<Note | null>(null);

  const mutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmed) return;

    mutation.mutate(id);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleCloseEdit = () => {
    setEditingNote(null);
  };

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => {
          const tagColor =
            tagColors[note.tag] || '#ffffff';

          return (
            <li
              key={note.id}
              className={css.listItem}
            >
              <span
                className={css.tag}
                style={{
                  color: tagColor,
                  borderColor: tagColor,
                  boxShadow: `0 0 14px ${tagColor}55`,
                }}
              >
                {note.tag}
              </span>

              <h2 className={css.title}>
                {note.title}
              </h2>

              <p className={css.content}>
                {note.content}
              </p>

              <div className={css.actions}>
                <button
                  type="button"
                  className={css.editButton}
                  onClick={() => handleEdit(note)}
                  disabled={mutation.isPending}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className={css.deleteButton}
                  onClick={() =>
                    handleDelete(note.id)
                  }
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? 'Deleting...'
                    : 'Delete'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {editingNote && (
        <Modal onClose={handleCloseEdit}>
          <div className={css.editModal}>
            <h2 className={css.editModalTitle}>
              Edit note
            </h2>

            <p className={css.editModalText}>
              Update the title, reminder date,
              content or category.
            </p>

            <NoteForm
              note={editingNote}
              onClose={handleCloseEdit}
            />
          </div>
        </Modal>
      )}
    </>
  );
}