import { NoteLayout } from "@/components/notelayout";
import { localContext } from "@/store/localContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Note } from ".";

export default function ShowPage() {
  const router = useRouter();
  const localCtx = useContext(localContext);
  const id = router.query.id as string;

  function onDeleteNote(id: string) {
    localCtx.setNotes((prevNotes: Note[]) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  return (
    <>
      <NoteLayout onDeleteNote={onDeleteNote} notes={localCtx.notesWithTags} id={id} />
    </>
  );
}
