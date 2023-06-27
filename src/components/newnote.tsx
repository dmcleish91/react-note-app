import { NoteData, Tag } from "@/pages";
import NoteForm from "./noteform";

type NewNotePageProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function NewNotePage({ onSubmit, onAddTag, availableTags }: NewNotePageProps) {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  );
}
