"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // Імпортуємо роутер тут
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter(); // Створюємо екземпляр роутера

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  // Ось ця функція, яку так хоче бачити ментор:
  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null;
  if (!note) return <Modal onClose={handleClose}>Note not found</Modal>;

  return (
    // Передаємо handleClose у проп onClose
    <Modal onClose={handleClose}>
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
