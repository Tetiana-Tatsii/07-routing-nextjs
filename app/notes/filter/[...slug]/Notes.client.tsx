"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import useDebounce from "@/hooks/useDebounce";
type Props = {
  tag: string;
};

export default function NotesFilterClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Дебаунс для пошуку (вимога ментора)
  const debouncedSearch = useDebounce(search, 500);

  // 2. Запит до API (тепер динамічний)
  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: tag === "all" ? "" : tag,
      }),
    refetchOnMount: false, // Вимога ментора
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      {/* 3. Рендеримо SearchBox та кнопку створення (вимога ментора) */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <SearchBox value={search} onChange={setSearch} />
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Create note +
        </button>
      </div>

      <h2>{tag ? `Notes tagged: ${tag}` : "All Notes"}</h2>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <>
          <NoteList notes={notes} />

          {/* 4. Виправляємо пропси пагінації під твій компонент */}
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}

      {/* 5. Рендеримо модалку з формою (вимога ментора) */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
