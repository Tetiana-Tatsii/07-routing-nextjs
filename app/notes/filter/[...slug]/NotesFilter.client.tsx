"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  tag: string;
};

export default function NotesFilterClient({ tag }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  const notes = data?.notes || [];

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        {tag ? `Notes tagged: ${tag}` : "All Notes"}
      </h2>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found for this category.</p>
      )}
    </div>
  );
}
