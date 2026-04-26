"use client";

import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Modal({ children, isOpen, onClose }: Props) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  if (isOpen === false) return null;

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={css.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}
