import { NoteData, Tag } from "@/pages";
import NoteForm from "./noteform";

type EditNotePageProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  id: string;
} & Partial<NoteData>;

export default function EditNotePage({ id, title, tags, markdown, onSubmit, onAddTag, availableTags }: EditNotePageProps) {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>Edit Note</h1>
      <NoteForm title={title} tags={tags} markdown={markdown} onSubmit={(data) => onSubmit(id, data)} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  );
}
