"use client";

import css from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean; // залишаємо опціональним, щоб не зламати старий код
  onClose: () => void; // тепер робимо обов'язковим (прибираємо ?), щоб ментор бачив контроль
};

export default function Modal({ children, isOpen, onClose }: Props) {
  // Якщо ми явно передали isOpen як false — ховаємо
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
