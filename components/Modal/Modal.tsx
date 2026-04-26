"use client";

import css from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: Props) {
  if (isOpen === false) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
