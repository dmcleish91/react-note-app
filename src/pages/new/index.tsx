import NewNotePage from "@/components/newnote";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useMemo } from "react";
import { NoteData, RawNote, Tag } from "..";

export default function NewPage() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

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

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <>
      <NewNotePage onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
    </>
  );
}
