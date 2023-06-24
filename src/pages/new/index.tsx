import NewNotePage from "@/components/newnote";
import type { NoteData, RawNote, Tag } from "..";
import { useMemo } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function NewPage() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("NOTES", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...data, id: crypto.randomUUID(), tagIds: tags.map((tag) => tag.id) }];
    });
  }

  return (
    <>
      <NewNotePage />
    </>
  );
}
