import EditNotePage from "@/components/editnote";
import { useContext } from "react";
import { localContext } from "@/store/localContext";
import type { Note, NoteData, Tag } from "..";
import { useRouter } from "next/router";

export default function EditPage() {
  const router = useRouter();
  const localCtx = useContext(localContext);
  const id = router.query.id as string;

  const note = localCtx.notesWithTags.find((note) => note.id === id);

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    localCtx.setNotes((prevNotes: Note[]) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function addTag(tag: Tag) {
    localCtx.setTags((prev: any) => [...prev, tag]);
  }

  if (note == null) return null;

  return (
    <>
      <EditNotePage title={note.title} tags={note.tags} markdown={note.markdown} id={note.id} onSubmit={onUpdateNote} onAddTag={addTag} availableTags={localCtx.tags} />
    </>
  );
}
