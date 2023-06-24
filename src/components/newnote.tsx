import { NoteData, RawNote, Tag } from "@/pages";
import NoteForm from "./noteform";

export default function NewNotePage() {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>New Note</h1>
      <NoteForm
        onSubmit={function (data: NoteData): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
}
