'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
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

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const tagColor = tagColors[note.tag] || '#ffffff';

        return (
          <li key={note.id} className={css.listItem}>
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

            <h2 className={css.title}>{note.title}</h2>

            <p className={css.content}>{note.content}</p>

            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
              disabled={mutation.isPending}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}