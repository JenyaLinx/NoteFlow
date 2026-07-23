'use client';

import Modal from '@/components/Modal/Modal';
import css from './DeleteConfirmModal.module.css';

interface DeleteConfirmModalProps {
  noteTitle: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  noteTitle,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal onClose={onCancel}>
      <div className={css.wrapper}>
        <div className={css.icon} aria-hidden="true">
          !
        </div>

        <h2 className={css.title}>Delete note?</h2>

        <p className={css.text}>
          Are you sure you want to delete{' '}
          <strong className={css.noteTitle}>
            “{noteTitle}”
          </strong>
          ?
        </p>

        <p className={css.warning}>
          This action cannot be undone.
        </p>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>

          <button
            type="button"
            className={css.deleteButton}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete note'}
          </button>
        </div>
      </div>
    </Modal>
  );
}