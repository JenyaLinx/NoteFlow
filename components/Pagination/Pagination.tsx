'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={css.pagination}>
      {Array.from({ length: totalPages }, (_, i) => {
        const currentPage = i + 1;
        const isActive = currentPage === page;

        return (
          <button
            key={currentPage}
            type="button"
            className={`${css.button} ${isActive ? css.active : ''}`}
            onClick={() => onChange(currentPage)}
            disabled={isActive}
          >
            {currentPage}
          </button>
        );
      })}
    </div>
  );
}