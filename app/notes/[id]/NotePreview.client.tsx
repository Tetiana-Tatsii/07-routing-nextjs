"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  // ВИПРАВЛЕНО ТУТ: додаємо обов'язковий onClose навіть для Loading
  if (isLoading) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  // ВИПРАВЛЕНО ТУТ: додаємо onClose для стану "не знайдено"
  if (!note) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <p>Note not found</p>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.wrapper}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {note.updatedAt
            ? `Updated at: ${new Date(note.updatedAt).toLocaleDateString()}`
            : `Created at: ${new Date(note.createdAt).toLocaleDateString()}`}
        </p>
      </div>
    </Modal>
  );
}
