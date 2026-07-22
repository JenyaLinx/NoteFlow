'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote, updateNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  note?: Note;
  onClose?: () => void;
}

interface NoteFormData {
  title: string;
  content: string;
  tag: string;
}

const tags = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
];

const REMINDER_PREFIX = 'Reminder date:';

const monthNumbers: Record<string, string> = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

const formatDateForInput = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const formatReadableDate = (dateValue: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateValue}T00:00:00`));
};

const getReminderDateFromContent = (
  content: string,
  fallbackDate: string
) => {
  const firstLine = content.split('\n')[0];

  if (!firstLine.startsWith(REMINDER_PREFIX)) {
    return fallbackDate;
  }

  const readableDate = firstLine.replace(REMINDER_PREFIX, '').trim();
  const [day, month, year] = readableDate.split(' ');
  const monthNumber = monthNumbers[month];

  if (!day || !monthNumber || !year) {
    return fallbackDate;
  }

  return `${year}-${monthNumber}-${day.padStart(2, '0')}`;
};

const getContentWithoutReminder = (content: string) => {
  const lines = content.split('\n');

  if (!lines[0]?.startsWith(REMINDER_PREFIX)) {
    return content;
  }

  return lines.slice(1).join('\n').replace(/^\n/, '');
};

export default function NoteForm({
  note,
  onClose,
}: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const isEditMode = Boolean(note);

  const today = useMemo(() => formatDateForInput(new Date()), []);

  const initialReminderDate = useMemo(() => {
    if (!note) return today;

    return getReminderDateFromContent(note.content, today);
  }, [note, today]);

  const [title, setTitle] = useState(
    note?.title ?? draft.title
  );

  const [content, setContent] = useState(
    note ? getContentWithoutReminder(note.content) : draft.content
  );

  const [tag, setTag] = useState(
    note?.tag ?? draft.tag
  );

  const [reminderDate, setReminderDate] = useState(
    initialReminderDate
  );

  const mutation = useMutation({
    mutationFn: async (data: NoteFormData) => {
      if (note) {
        return updateNote(note.id, data);
      }

      return createNote(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      if (isEditMode) {
        onClose?.();
        return;
      }

      clearDraft();
      router.back();
    },
  });

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setTitle(value);

    if (!isEditMode) {
      setDraft({
        ...draft,
        title: value,
      });
    }
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    setContent(value);

    if (!isEditMode) {
      setDraft({
        ...draft,
        content: value,
      });
    }
  };

  const handleTagChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setTag(value);

    if (!isEditMode) {
      setDraft({
        ...draft,
        tag: value,
      });
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const dateLine = `${REMINDER_PREFIX} ${formatReadableDate(
      reminderDate
    )}`;

    const contentWithDate = `${dateLine}\n\n${content.trim()}`;

    mutation.mutate({
      title: title.trim(),
      content: contentWithDate,
      tag,
    });
  };

  const handleCancel = () => {
    if (isEditMode) {
      onClose?.();
      return;
    }

    router.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={css.form}
    >
      <div className={css.formGroup}>
        <label htmlFor={isEditMode ? 'edit-title' : 'title'}>
          Title
        </label>

        <input
          id={isEditMode ? 'edit-title' : 'title'}
          name="title"
          value={title}
          onChange={handleTitleChange}
          className={css.input}
          placeholder="Enter note title..."
          required
        />
      </div>

      <div className={css.formGroup}>
        <label
          htmlFor={
            isEditMode
              ? 'edit-reminderDate'
              : 'reminderDate'
          }
        >
          Reminder date
        </label>

        <input
          id={
            isEditMode
              ? 'edit-reminderDate'
              : 'reminderDate'
          }
          name="reminderDate"
          type="date"
          value={reminderDate}
          onChange={(e) =>
            setReminderDate(e.target.value)
          }
          className={`${css.input} ${css.dateInput}`}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label
          htmlFor={isEditMode ? 'edit-content' : 'content'}
        >
          Content
        </label>

        <textarea
          id={isEditMode ? 'edit-content' : 'content'}
          name="content"
          value={content}
          onChange={handleContentChange}
          className={css.textarea}
          placeholder="Write your note..."
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={isEditMode ? 'edit-tag' : 'tag'}>
          Category
        </label>

        <select
          id={isEditMode ? 'edit-tag' : 'tag'}
          name="tag"
          value={tag}
          onChange={handleTagChange}
          className={css.select}
        >
          {tags.map((tagOption) => (
            <option
              key={tagOption}
              value={tagOption}
            >
              {tagOption}
            </option>
          ))}
        </select>
      </div>

      {mutation.isError && (
        <p className={css.error}>
          Something went wrong. Please try again.
        </p>
      )}

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
          disabled={mutation.isPending}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? isEditMode
              ? 'Saving...'
              : 'Creating...'
            : isEditMode
              ? 'Save changes'
              : 'Create note'}
        </button>
      </div>
    </form>
  );
}