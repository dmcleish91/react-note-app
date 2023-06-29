import type { Note } from "@/pages";
import NavigateBack from "./navigateback";
import NotePage from "./note";

type NoteLayoutProps = {
  notes: Note[];
  id: string;
  onDeleteNote: (id: string) => void;
};

export function NoteLayout({ notes, id, onDeleteNote }: NoteLayoutProps) {
  const note = notes.find((note) => note.id === id);

  if (note == null) return <NavigateBack url='/' />;

  return <NotePage onDeleteNote={onDeleteNote} note={note} />;
}
